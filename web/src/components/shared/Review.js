import React from 'react'
import TimeAgo from 'react-timeago'
import Rating from '@material-ui/lab/Rating';

const Review = (props) => {

  const { review } = props;

  return (
    <div className="review">
      <h5>
        {review.title}
        <Rating
          value={review.rating}
          readOnly
          precision={0.1}
        />
      </h5>
      <p>{review.description}</p>
      <TimeAgo className="text-muted review-time" date={review.created} />
    </div>
  )
}

export default Review
