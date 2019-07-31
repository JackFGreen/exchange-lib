export function number (val, arg) {
  const res = arg === true ? val.replace(/[^0-9]/g, '') : val
  return res
}

export function len (val, arg) {
  const res = val.substr(0, arg)
  return res
}

export function decimals (val, arg) {
  const res = val.match(`([0-9]*)(\\.[0-9]{0,${arg}})?`)[0]
  return res
}
