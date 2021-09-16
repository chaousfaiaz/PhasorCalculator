tempVMag = null; //must be global!
tempVAng = null; //must be global!


//Determine if web storage is available here ...
var hasStorage = true;
try {
	localStorage.test = "999";
}
catch(error) {
	hasStorage = false;
}
	


function vQual(part1,part2) {
	//alert ("Function vQual invoked to evaluate vector quality");
	
	var Qual = true;
	
	if ( isNaN(part1) || isNaN(part2)) {
		Qual = false;
	} else {
		Qual = true;
	}
	
	return Qual;
}

function vectorRect(mag,degrees){
	//alert("Function vectorRect invoked get rectangular components of polar expression of vector");
	
	var v = { mag:0, degrees:0, radians:0, real:0, imag:0 };
	v.mag = mag;
	v.degrees = degrees;
	radians = (Math.PI/180) * degrees;
	v.radians = radians;
	v.real = Math.cos(radians)*mag;
	v.imag = Math.sin(radians)*mag;
	
	return v;
}
	
function vectorPolr (real,imag) {
	//alert("Function vectorPolr invoked to get polar expression of vector. ");
	
	var v = { mag:0, degrees:0, radians:0, real:0, imag:0 };
	v.mag = Math.sqrt(real*real + imag*imag);
	if (v.mag > 0) {
		ysin = imag/v.mag;
	} else {
		ysin = 0;
	}
	if (real >= 0 ) {
		v.radians = Math.asin(ysin);
	} else {
		if (imag > 0) {
			v.radians = -Math.asin(ysin) + Math.PI;
		} else {
			v.radians = -Math.asin(ysin) - Math.PI ;
		}
	}
	v.degrees = v.radians*(180/Math.PI);
	v.real = real;
	v.imag = imag;
	return v;

}


function storeV(vId) {
	
	//alert("function 'storeV' invoked for vector ID: " + vId);
	
	if(hasStorage == false) {
		alert('You cannot save result because web storage is not available in your browser; you may be in Private Browsing mode');
	
	} else {
		vMag = tempVMag;
		vAng = tempVAng;
		quality = vQual(vMag,vAng);
		
		if (quality == false) {
			alert("INVALID RESULT NOT STORED");
		} else {
			text = "Click \"OK\" to confirm storage as " + vId + ":\n Magnitude: " + vMag + "\n Angle: " + vAng + " degrees";
						
			switch(vId) {
				case "V1":
					r = confirm(text);
					if ( r ) {
						localStorage.v1Mag = vMag;
						localStorage.v1Ang = vAng;
					}
					break;
				case "V2":
					r = confirm(text);
					if ( r ) {
						localStorage.v2Mag = vMag;
						localStorage.v2Ang = vAng;
					}
					break;
				case "V3":
					r = confirm(text);
					if ( r ) {
						localStorage.v3Mag = vMag;
						localStorage.v3Ang = vAng;
					}
					break;	
				default:
					alert("Error: Unrecognized phasor selected.")
			}
		}	
	}	
	//alert("storeV finished")	
}

function recallV(vId,formId,magLoc,angLoc) {
	//alert("function 'recallV' invoked; formId: " + formId + " ; vId: " + vId);
	var vMag = "0.0";
	var vAng = "0.0";
	
	if(hasStorage == false) {
		alert('You cannot recall a result because web storage is not available in your browser; you may be in Private Browsing mode');
	} else {
		
		switch(vId) {
			case "V1":Storage
				vMag = localStorage.v1Mag;
				vAng = localStorage.v1Ang;
				break;
			case "V2":
				vMag = localStorage.v2Mag;
				vAng = localStorage.v2Ang;
				break;
			case "V3":
				vMag = localStorage.v3Mag;
				vAng = localStorage.v3Ang;
				break;	
			default:
				alert("Error: Unrecognized vector selected.")
		}
		
		
		
		text = vId + " recalled: " + vMag + " ;  " + vAng ;
		//alert(text);
		
		document.getElementById(formId).elements[magLoc].value = vMag; 
		document.getElementById(formId).elements[angLoc].value = vAng;
				
	}
}

