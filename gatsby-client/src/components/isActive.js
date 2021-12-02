function isActive({ isCurrent }) {
    return isCurrent ? { style: { color: "#777", fontWeight: "500", fontFamily: "Metric-Medium" } } : {style:{}}
  }
export default isActive;