import PropTypes from "prop-types"
import React from "react"

import { useHarperDB } from "use-harperdb"

import { StarRatings } from "./StarRatings"

import "./Reviews.css"

export const Reviews = ({ type = "books" }) => {
  const [data, loading, error] = useHarperDB({
    query: {
      operation: "sql",
      sql: `select * from reviews.${type}`,
    },
    interval: 50000,
  })

  if (loading) {
    return <div>Loading...</div>
  }
  if (data?.length) {
    return (
      <>
        <table>
          <thead>
            <tr>
              <td>Book</td>
              <td>Author</td>
              <td>Rating</td>
            </tr>
          </thead>
          
          <tbody>
            {data.map(({ bookid, name, author, review }) => (
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
      </>
    )
  }
  return <p>No data! {error}</p>
}

Reviews.propTypes = {
  type: PropTypes.string,
}
