function isActive({ isCurrent }) {
    return isCurrent ? { style: { color: "#777", fontWeight: "500", fontFamily: "Metric-Medium" } } : {}
  }
export default isActive;