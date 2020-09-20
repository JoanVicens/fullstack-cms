const mailjet = require ('node-mailjet')
	.connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE)

exports.afegirContacte = async (music) => {

	const emailContacte = music.email || music.al + '@uji.es'

	const mailjetResponse = await mailjet
		.post("contact", { 'version': 'v3' })
		.request({
			"IsExcludedFromCampaigns": "false",
			"Name": music.nom,
			"Email": emailContacte
		})

	return mailjetResponse.body.Data[0].ID
}

exports.afegirALaLlista = (music) => {

	const request = mailjet
		.post("contact", {'version': 'v3'})
		.id(music)
		.action("managecontactslists")
		.request({
	      "ContactsLists":[
	        {
	          "Action":"addforce",
	          "ListID":"2437598"
	        }
	      ]
	    })
	request
		.then((result) => {
			return result.body
		})
		.catch((err) => {
			console.log(err.statusCode)
			return null
		})
}

exports.llevarDeLaLlista = (mailjet_id) => {

	const request = mailjet
		.post("contact", {'version': 'v3'})
		.id(mailjet_id)
		.action("managecontactslists")
		.request({
	      "ContactsLists":[
	        {
	          "Action":"remove",
	          "ListID":"2437598"
	        }
	      ]
	    })
	request
		.then((result) => {
			return result.body
		})
		.catch((err) => {
			console.log(err)
			return null
		})
}

exports.eliminarContacte = (mailjet_id) => {

	var https = require('follow-redirects').https;
	var fs = require('fs');

	var options = {
	  'method': 'DELETE',
	  'hostname': 'api.mailjet.com',
	  'path': `/v4/contacts/${mailjet_id}`,
	  'headers': {
	    'Authorization': 'Basic OTdhOThlZmU5NWQyMjg5Nzc5MDBiYjNmNWEwODhhOGM6OWY4YmNmZDJiNzk2YjczYmI3Yjg5NTNlZmZjNjc1Y2Y='
	  },
	  'maxRedirects': 20
	};

	var req = https.request(options, function (res) {
	  var chunks = [];

	  res.on("data", function (chunk) {
	    chunks.push(chunk);
	  });

	  res.on("end", function (chunk) {
	    var body = Buffer.concat(chunks);
	    console.log(body.toString());
	  });

	  res.on("error", function (error) {
	    console.error(error);
	  });
	});

	req.end();
}
