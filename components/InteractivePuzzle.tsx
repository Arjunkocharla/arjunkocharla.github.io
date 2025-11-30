'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Sparkles, ArrowRight } from 'lucide-react'

interface PuzzlePiece {
  id: string
  text: string
  correctX: number
  correctY: number
  isPlaced: boolean
  color: string
  currentX?: number
  currentY?: number
}

const puzzlePieces: PuzzlePiece[] = [
  { id: '1', text: 'Full', correctX: 0, correctY: 0, isPlaced: false, color: 'from-primary-400 to-primary-500' },
  { id: '2', text: 'Stack', correctX: 1, correctY: 0, isPlaced: false, color: 'from-primary-500 to-primary-600' },
  { id: '3', text: 'Dev', correctX: 2, correctY: 0, isPlaced: false, color: 'from-primary-600 to-primary-500' },
  { id: '4', text: 'Creative', correctX: 0, correctY: 1, isPlaced: false, color: 'from-primary-400 to-primary-500' },
  { id: '5', text: 'Problem', correctX: 1, correctY: 1, isPlaced: false, color: 'from-primary-500 to-primary-600' },
  { id: '6', text: 'Solver', correctX: 2, correctY: 1, isPlaced: false, color: 'from-primary-600 to-primary-500' },
]

export default function InteractivePuzzle() {
  const [pieces, setPieces] = useState<PuzzlePiece[]>(puzzlePieces)
  const [completed, setCompleted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const cellSize = 100
  const gridOffsetX = 50
  const gridOffsetY = 100

  useEffect(() => {
    // Randomize initial positions
    const shuffled = pieces.map((piece) => ({
      ...piece,
      currentX: Math.random() * 200 + 50,
      currentY: Math.random() * 150 + 250,
    }))
    setPieces(shuffled)
  }, [])

  const handleDragEnd = (pieceId: string, info: any) => {
    const piece = pieces.find((p) => p.id === pieceId)
    if (!piece || piece.isPlaced) return

    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const x = info.point.x - rect.left
    const y = info.point.y - rect.top

    // Calculate grid position
    const gridX = Math.floor((x - gridOffsetX) / cellSize)
    const gridY = Math.floor((y - gridOffsetY) / cellSize)

    // Check if placed correctly (with tolerance)
    if (
      gridX === piece.correctX &&
      gridY === piece.correctY &&
      Math.abs(x - (gridOffsetX + piece.correctX * cellSize + cellSize / 2)) < cellSize / 2 &&
      Math.abs(y - (gridOffsetY + piece.correctY * cellSize + cellSize / 2)) < cellSize / 2
    ) {
      const updatedPieces = pieces.map((p) =>
        p.id === pieceId
          ? {
              ...p,
              isPlaced: true,
              currentX: gridOffsetX + piece.correctX * cellSize + cellSize / 2,
              currentY: gridOffsetY + piece.correctY * cellSize + cellSize / 2,
            }
          : p
      )
      setPieces(updatedPieces)

      // Check if all pieces are placed
      const allPlaced = updatedPieces.every((p) => p.isPlaced)
      if (allPlaced && !completed) {
        setCompleted(true)
      }
    }
  }

  const placedCount = pieces.filter((p) => p.isPlaced).length

  return (
    <div ref={containerRef} className="relative w-full h-[500px] glass rounded-3xl p-6 overflow-hidden">
      {!completed ? (
        <>
          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold mb-2 gradient-text flex items-center justify-center gap-2">
              <Sparkles size={24} className="text-primary-400" />
              Piece Me Together
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Drag the pieces to the correct spots
            </p>
            <div className="mt-2 text-xs text-primary-400">
              {placedCount} / {pieces.length} completed
            </div>
          </div>

          {/* Grid */}
          <div className="relative mx-auto" style={{ width: cellSize * 3, height: cellSize * 2, marginTop: '20px' }}>
            {[0, 1].map((row) =>
              [0, 1, 2].map((col) => {
                const piece = pieces.find((p) => p.correctX === col && p.correctY === row && p.isPlaced)
                return (
                  <div
                    key={`${row}-${col}`}
                    className="absolute border-2 border-dashed rounded-lg flex items-center justify-center transition-all"
                    style={{
                      left: col * cellSize,
                      top: row * cellSize,
                      width: cellSize - 10,
                      height: cellSize - 10,
                      borderColor: piece ? 'rgba(14, 165, 233, 0.5)' : 'rgba(14, 165, 233, 0.2)',
                      backgroundColor: piece ? 'rgba(14, 165, 233, 0.1)' : 'transparent',
                    }}
                  >
                    {piece && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-primary-400"
                      >
                        <Check size={20} />
                      </motion.div>
                    )}
                  </div>
                )
              })
            )}

            {/* Puzzle Pieces */}
            {pieces.map((piece) => (
              <motion.div
                key={piece.id}
                className={`absolute cursor-grab active:cursor-grabbing ${
                  piece.isPlaced ? 'z-10' : 'z-20'
                }`}
                style={{
                  left: piece.isPlaced ? piece.currentX! - 50 : piece.currentX! - 50,
                  top: piece.isPlaced ? piece.currentY! - 25 : piece.currentY! - 25,
                }}
                drag={!piece.isPlaced}
                dragMomentum={false}
                dragConstraints={containerRef}
                onDragEnd={(e, info) => handleDragEnd(piece.id, info)}
                whileHover={piece.isPlaced ? {} : { scale: 1.1 }}
                whileDrag={{ scale: 1.15, zIndex: 50 }}
                animate={{
                  opacity: piece.isPlaced ? 1 : 0.9,
                }}
              >
                <div
                  className={`px-5 py-3 rounded-xl bg-gradient-to-r ${piece.color} text-white font-bold text-base shadow-lg transition-all ${
                    piece.isPlaced
                      ? 'ring-2 ring-primary-300 ring-offset-2 ring-offset-transparent'
                      : 'hover:shadow-xl'
                  }`}
                >
                  {piece.text}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Progress Indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="flex gap-2">
              {pieces.map((piece) => (
                <motion.div
                  key={piece.id}
                  className={`w-2 h-2 rounded-full transition-all ${
                    piece.isPlaced
                      ? 'bg-primary-400 scale-125'
                      : 'bg-gray-400 dark:bg-gray-600'
                  }`}
                  animate={piece.isPlaced ? { scale: 1.25 } : { scale: 1 }}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center h-full text-center"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="mb-6"
          >
            <Sparkles className="text-primary-400" size={64} />
          </motion.div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-bold mb-4 gradient-text"
          >
            Puzzle Complete!
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-gray-600 dark:text-gray-400 mb-6 max-w-md"
          >
            You've unlocked my portfolio! Scroll down to explore my work, skills, and projects.
          </motion.p>
          <motion.a
            href="#about"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg font-semibold text-white hover:shadow-lg transition-all flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Portfolio
            <ArrowRight size={20} />
          </motion.a>
        </motion.div>
      )}
    </div>
  )
}
