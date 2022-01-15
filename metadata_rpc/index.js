
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var fs = require('fs')
var fsp = require('fs').promises;
var stream = require('stream')
var cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 8080;
var router = express.Router();

async function getAllJsonFiles() {
    let jsonArr = [];
    const directoryPath = './erc1155_metadata/json/';
    const files = await fsp.readdir(directoryPath)
    for(let i=0;i<files.length;i++)
    {
        console.log("Reading file: "+directoryPath+files[i])
        let json = await fsp.readFile(directoryPath+files[i])
        console.log("found json: ",JSON.parse(json))
        jsonArr = [...jsonArr,JSON.parse(json)] 
    }
    return jsonArr;
}

router.get('/items', async function(req,res)
{
    let jsonArr = await getAllJsonFiles();

    res.json(jsonArr)
})
router.get('/item/json/:id.json', function(req, res) {
    var id = req.params.id;
    var j;
    fs.readFile('./erc1155_metadata/json/'+id+'.json', (err, json) => {
        j = JSON.parse(json);       
        res.json(j);
    });
})

router.get('/item/image/:id.png', function(req, res) {
    var id = req.params.id;
    const r = fs.createReadStream('./erc1155_metadata/image/'+id+'.png')
    const ps = new stream.PassThrough()
    stream.pipeline(r,ps, (err) => {
        if (err) {
            console.log(err)
            return res.sendStatus(400); 
        }
    })
    ps.pipe(res)
});
app.use(cors())
app.use('/api', router);
app.listen(port);
console.log('API started on port: ' + port);