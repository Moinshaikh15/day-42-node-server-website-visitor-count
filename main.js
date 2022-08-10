let http = require('http')
// console.log(http.STATUS_CODES)
let fs = require('fs')
let count = 0
let server = http.createServer((req, res) => {
    console.log('responce is incoming', req.headers, req.url)
    let path = './views/'
    let url = '/'
    res.setHeader('Content-type', 'text/html')

    switch (req.url) {
        case '/':
        case '/home':
        case '/products':
        case '/contacts':
            path += 'index.html'
            url += 'index'
            count++;
            break;
        case '/style.css':
            res.setHeader('Content-type', 'text/css')
            path += 'style.css'
            break;
        default:
            path += 'index.html'
    }


    fs.readFile(path, { encoding: 'utf-8' }, (err, data) => {

        if (err) {
            res.write('server Err', err.message)
            res.end();
            return
        }
        let updatedData = data.replace(`{{count}}`, count)
        updatedData = updatedData.replace(`{{header}}`, req.url.split('/').pop())
        res.write(updatedData)
        res.end();


    })


    // if (req.url === '/end')
    //     server.close(() => {
    //         console.log('server is closed ')
    //     });

})

server.on('error', (error) => {
    console.log('error', error.message)
})
server.on('close', () => {
    console.log('server closed')
})


let PORT = 8000;
server.listen(PORT, () => {
    console.log('server shutting dowm')
})

