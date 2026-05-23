function ReviewCard(props) {
  const { review } = props;

  // Determine color based on score
  const getScoreColor = (score) => {
    if (score < 60) return "#ff4d4d"; // Red
    if (score < 75) return "#ffcc00"; // Yellow
    return "#00ce67ff"; // Green
  };

  return (
    <a href="#" style={{ "text-decoration": "none", color: "inherit" }}>
      <div class="review-card" style={{
        "background-color": "#d9d9d9",
        padding: "20px",
        "border-radius": "15px",
        height: "100%",
        width: "200px",
        "box-sizing": "border-box",
        "white-space": "normal",
        display: "grid",
        "grid-template-rows": "auto 1fr",
        gap: "10px"
      }}>
        <div style={{ display: "flex", "justify-content": "space-between", "align-items": "center" }}>
          <span style={{
            "background-color": getScoreColor(review.score),
            color: review.score >= 60 && review.score < 75 ? "#000" : "#fff",
            padding: "5px 10px",
            "border-radius": "8px",
            "font-size": "18px",
            "font-weight": "bold"
          }}>
            {review.score}
          </span>
          <div style={{ display: "flex", "flex-direction": "column", "align-items": "flex-end" }}>
            <span style={{ "font-size": "13px", color: "#666", "text-align": "right", "line-height": "1.2", "font-weight": "bold" }}>{review.reviewer}</span>
            <span style={{ "font-size": "11px", color: "#888", "text-align": "right", "margin-top": "2px", "font-style": "italic" }}>{review.gameTitle}</span>
          </div>
        </div>
        <p style={{ margin: 0, color: "#333", "font-size": "14px", "line-height": "1.5" }}>
          {/*Kalau text review diatas 100 character, 101-N char jadi ... */}
          {review.text.length > 100 ? review.text.substring(0, 100) + "..." : review.text}
        </p>
      </div>
    </a>
  );
}

export default ReviewCard;
