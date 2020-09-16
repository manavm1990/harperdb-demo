import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"

import { useHarperDB } from "use-harperdb"

import { StarRatings } from "./StarRatings"

import "./Reviews.css"

function compareByStringify(a, b) {
  return JSON.stringify(a) === JSON.stringify(b)
}

export const Reviews = ({ type = "books" }) => {
  const [reviews, setReviews] = useState([])

  const [data, loading, error] = useHarperDB({
    query: {
      operation: "sql",
      sql: `select * from reviews.${type}`,
    },
    interval: process.env.REACT_APP_INTERVAL,
  })

  useEffect(() => {
    if (!compareByStringify(data, reviews)) {
      setReviews(data)
    }
  }, [data, reviews])

  if (!compareByStringify(data, reviews) && loading) {
    return <div>Loading...</div>
  }
  if (reviews?.length) {
    return (
      <table>
        <thead>
          <tr>
            <td>Book</td>
            <td>Author</td>
            <td>Rating</td>
          </tr>
        </thead>

        <tbody>
          {reviews.map(({ bookid, name, author, review }) => (
            <tr key={bookid}>
              <td>{name}</td>
              <td>{author}</td>
              <td>
                <StarRatings rating={review} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
  return <p>No data! {error}</p>
}

Reviews.propTypes = {
  type: PropTypes.string,
}
