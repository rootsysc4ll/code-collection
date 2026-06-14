let url = 'http://'
const input = process.argv.slice(2)[0]
if (input) {
  url = url.concat(input) 
} else {
  url = url.concat('localhost:3000')
}

console.log(url)
const target = url
export default target