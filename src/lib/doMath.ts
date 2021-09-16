export default function doMath(n1: number, n2: number, op: "+" | "-" | "*" | "/") {
  if ("*/".indexOf(op) >= 0) {
    return eval([n1, op, n2].join(""))
  } else {
    return eval([Math.round(n1 * 100), op, Math.round(n2 * 100)].join("")) / 100
  }
}