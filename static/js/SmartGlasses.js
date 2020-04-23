document.getElementById("div_captured").style.display="none";

function download(){
  Webcam.snap( function(data_uri) {
            // display results in page
  var name = prompt("Please enter file name", "SmartSnap");
  if (name != null) {
    var a = document.createElement('a');
    a.setAttribute('download', name + '.jpg');
    a.setAttribute('href', data_uri);
    a.click();
  }
  } );            
  }

function ShowCam() {
  Webcam.set({
      width: 480,
      height: 320,
      image_format: 'jpeg',
      jpeg_quality: 100
  });
  Webcam.attach('#my_camera');
}
window.onload= ShowCam;

function snap() {
  Webcam.snap( function(data_uri) {
      // display results in page
      document.getElementById('results').innerHTML =
      '<img id="image" width="480" height="320" src="'+data_uri+'"/>';

      document.getElementById("div_captured").style.display="block";
    } );
}

function upload() {
  console.log("Uploading...")
  var image = document.getElementById('image').src;
  var form = document.getElementById('myForm');
  var formData = new FormData(form);
  formData.append("file", image);
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("POST", "/signup");

  // check when state changes,
  xmlhttp.onreadystatechange = function() {

  if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      alert('Image Uploaded.')
      
      }

  }

  xmlhttp.send(formData);
  console.log(formData.get('file'));
 // console.log(formData.get('image_name'));
}

