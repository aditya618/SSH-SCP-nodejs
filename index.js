const SSH = require('simple-ssh');
const parser = require('node-csv-parse');
const scp = require('node-scp')

const host = '';
const user = '';
const password = '';



var ssh_options = new SSH({
    host: host,
    user: user,
    pass: password
});
// execute the df -h command to find out disk utilization
ssh_options.exec('df', {
    out: function(stdout) {
        parse(stdout);
        console.log(stdout);
    }
}).start();

function parse(data){

	var parsed = parser(data, {
		delimiter: ' ',
		trim: true
	}).asRows();

    console.log(parsed);
}


// var remote_server = {
//   host: host, //remote host ip 
//   // port: 22, //port used for scp 
//   username: user, //username to authenticate
//   password: password, //password to authenticate
//   // forceIPv4: boolean,  //Connection allow only via resolved IPv4 address (true/false)
//   // forceIPv6: boolean,  //Connection allow only via resolved IPv6 address (true/false)
//   // privateKey: fs.readFileSync('./key.pem'),
//   // passphrase: 'your key passphrase', 
// }

// var local_file_path = './test';
// var server_file_path = '/test';
//  send_file_using_async_await(local_file_path, server_file_path); 
//  async function send_file_using_async_await(file_path, server_path){
//     try {
//         const c = await scp(remote_server)
//         await c.downloadDir(server_path, file_path)
//         c.close()
//       } catch (e) {
//         console.log(e)
//       }
// } 
// scp({
//   host: host,
// //   port: 22,
//   username: user,
//   password: password,
//   // privateKey: fs.readFileSync('./key.pem'),
//   // passphrase: 'your key passphrase',
// }).then(client => {
//   client.downloadFile('/sample.txt', './test.txt')
//         .then(response => {
//           client.close() // remember to close connection after you finish
//         })
//         .catch(error => {})
// }).catch(e => console.log(e))