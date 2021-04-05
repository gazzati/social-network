import React, { useState } from 'react'
import cn from 'classnames'
import leftArrowIcon from 'src/assets/images/exit.png'
import rightArrowIcon from 'src/assets/images/rightArrowIcon.svg'

import styles from './style.module.scss'

type PropsType = {
  totalItemsCount: number
  pageSize: number
  currentPage?: number
  onPageChanged?: (pageNumber: number) => void
  portionSize?: number
}

const Paginator: React.FC<PropsType> = ({
  totalItemsCount,
  pageSize,
  currentPage = 1,
  onPageChanged,
  portionSize = 5
}) => {
  const pagesCount = Math.ceil(totalItemsCount / pageSize)

  const pages: Array<number> = []
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }

  const portionCount = Math.ceil(pagesCount / portionSize)
  const [portionNumber, setPortionNumber] = useState(1)
  const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
  const rightPortionPageNumber = portionNumber * portionSize

  return (
    <div className={cn(styles.paginator)}>
      <div className={styles.container}>
        <img
          src={leftArrowIcon}
          alt=""
          className={portionNumber > 1 ? styles.button : styles.buttonHidden}
          onClick={() => {
            setPortionNumber(portionNumber - 1)
          }}
        />
        {pages
          .filter((p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
          .map((p) => (
            <div
              className={cn({ [styles.selectedPage]: currentPage === p }, styles.pageNumber)}
              key={p}
              onClick={() => {
                onPageChanged && onPageChanged(p)
              }}
            >
              {p}
            </div>
          ))}
        {portionCount > portionNumber && (
          <img
            src={rightArrowIcon}
            alt=""
            className={styles.button}
            onClick={() => {
              setPortionNumber(portionNumber + 1)
            }}
          />
        )}
      </div>
    </div>
  )
}

export default Paginator
