
var list =[
		{	
			"id": "1",			
			"title":"Hà nội mưa lơn ở nhiều khu vực",
			"list":"Khoa học đời sống",
			"date":"25/08/2018",
			"status":"Chặn",
			"content":"Tuy nhiên nhiều vấn đề xảy ra khi mà đối tượng giaoDien được truyền sang, class download được phép gọi một số phương thức của class GiaoDien mà nó không cần, phương thức cập nhật giao diện bắt buộc phải cho phép gọi ở class Download thì mới có thể gọi được mà ở đây mình để là public chứ không thể là private. Hoặc giả sử như class chúng ta phải thông qua một class X nào đó ở giữa thì phương thức download của class",
			"email": "minhnt@gmail.com",
			"sdt"	: "09324324234",
			"tag": "abc,def",
		},
		{	"id": "2",			
			"title":"Các chàng trai dũng cảm của chúng ta",
			"list":"Khoa học đời sống",
			"date":"25/08/2018",
			"status":"Đặt lịch",
			"content":"Tuy nhiên nhiều vấn đề xảy ra khi mà đối tượng giaoDien được truyền sang, class download được phép gọi một số phương thức của class GiaoDien mà nó không cần, phương thức cập nhật giao diện bắt buộc phải cho phép gọi ở class Download thì mới có thể gọi được mà ở đây mình để là public chứ không thể là private. Hoặc giả sử như class chúng ta phải thông qua một class X nào đó ở giữa thì phương thức download của class",
			"email": "abc@gmail.com",
			"sdt"	: "0943243243",
			"tag": "abc,def",
		}
]
var arrId=[];
var stt = 0;
var arrTag=[];
var arrTagEdit=[];
$(document).ready(function () {	
	var form;
	var tb;
	var body;
	loadData();
	//popup
	popUp();
	//INSERT
 	insert();
 	$(status).val("Duyệt");
 	choseRad('#rad_post_insert','#rad_post_after','#status_insert','#date_insert');
 	reset();
 	//UPDATE	
 	// choseRad('#rad_post_d','#rad_post_after_d','#status_d');
 	update();
 	//datepost
 	datePost();
 	//choseall
 	checkAll();
 	//blockall
	blockAll();
	//appravaall
 	appravalAll();
 	deleteAll();
 	//vadidate
 	autoGenUrl('#title_insert','#link_insert');
 	autoGenUrl('#title_update','#link_update');
 	addTag();
})
function loadData() {
    // var $form = $('#datatable tbody .tr-body');  
	tb = $('#datatable');
	body  = tb.find('tbody'); 
	form = body.clone();
	$(body).remove();
	$.each(list,function (i,data) {
		bodyLoad(i,data);
	});
}
//load for insert
function getData() {
	tb = $('#datatable');
	body  = tb.find('tbody');
	$(body).remove();
	$.each(list,function (i,data) {		
		bodyLoad(i,data);
	});	
}
function bodyLoad(i,data) {
	$(form).clone().appendTo(tb);
		var index = tb.find('tbody')[i];
		stt = i+1;
		$(index).find(".STT").text(stt);
		$(index).find(".post-title").text(data.title);
		$(index).find(".list").text(data.list);
		$(index).find(".date").text(data.date);
		$(index).find(".status").text(data.status);	
		if(data.status!="Chặn"){
			$(index).find($('.block')).show();
			$(index).find($('.approval')).hide();
			 $(index).find($('.updateRow')).show();
		}else {
			$(index).find($('.block')).hide();
			$(index).find($('.approval')).show();
			 $(index).find($('.updateRow')).hide();
		}
		//approval
		$(index).find($('.approval')).click(function () {		
		   if(confirm("Bạn có muốn duyệt bài không")){
		   	$(index).find($('.updateRow')).hide();
		 	list[i].status = "Duyệt";
			reload();
			loadData();
			}
		});	
		//delete
		$(index).find($('.delete')).click(function () {		
		   if(confirm("Bạn có muốn xóa bài không")){
			   	list.splice(i,1); // remove item from i
				reload();
				loadData();			
			}
		});	
		//block
		$(index).find($('.block')).click(function () {		
		   if(confirm("Bạn có muốn chặn bài không")){
		   $(index).find($('.updateRow')).show();
		 	list[i].status = "Chặn";
			reload();
			loadData();
			}
		});
		//filldata update	
		$(index).find($('.updateRow')).click(function () {
			fillData(data);	
			fillUrl('#title_update','#link_update');
		});	
		//filldata view	
		$(index).find($('.viewRow')).click(function () {
			fillDataView(data);	
			fillUrl('#title_view','#link_view');
		});
		//fill id datepost
		$(index).find($('.datepost')).click(function () {
			fillId(data);
		});
		//CLICK CHECKBOX
		$(index).find($('.cbx_chose')).click(function () {
			if($(this).is(':checked')==true){
				if(arrId.length===0){
					arrId.push(data.id);
					$.each($(arrId),function (key,item) {
						// alert(item);
					})
				}else {
					if( checkExist(data.id)==false){
						arrId.push(data.id);
					}	
					$.each($(arrId),function (key,item) {
						// alert(item);
					})
				} 
			}else{
				arrId.splice(arrId.indexOf(data.id),1); // splice(delete location,row delete number)
				$.each($(arrId),function (key,item) {
						// alert(item);
					})
			}				
		});
}

function popUp() {	
	$('#popup_insert').click(function () {	
		$(this).prop('href','#insert');
	});	
}


//OPEN INSERT
function insert() {
	$('#btn_post').click(function () {
		if(validateNull('#title_insert')==true){
			alert("Tiêu đề không để trống");
		}else if(characterLimit('#content_insert')==true){
			alert("Nội dung không được nhỏ hơn 200 kí tự");
		}else if(charSpecial('#content_insert')==true){
			alert("Nội dung không chứa các kí tự (>, <, &, )");
		}else if(validateEmail('#email_insert')==false){
			alert("Mail không hợp lệ ví dụ: abc@gmail.com");
		}else if(validatePhone('#sdt_insert')==false){
			alert("Số điện thoại không đúng: 10 hoặc 11 số vd: 01xxx, 09xxx,08xxx");
		}else{
			list.push(setInsert());
	 		reset_insert();
	 		reload();
	 		getData(); 	
	 		alert("Thêm thành công");	
		} 			
 	});	
};

function choseRad(rad1,rad2,status,date) {
	$(rad1).prop('checked',true);
	$(status).val("Duyệt");	
	$(date).prop('disabled', true);	
	$(rad1).click(function () {
		$(rad2).prop('checked',false);
		$(status).val("Duyệt");
		$(date).prop('disabled', true);	
		$(date).val("");					
 	});
 	$(rad2).click(function () {
		$(rad1).prop('checked',false);
		$(status).val("Đặt lịch");
		$(date).prop('disabled', false);		 		
 	});
}
function getDateNow() {
	var d = new Date();
	var strDate = d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear();
	return strDate;
}

function datePostInsert() {
	var date="";
	var date_post =  $('#date_insert').val();
	var ck_post_now = $('#rad_post_insert').is(':checked');
	var ck_post_after = $('#rad_post_after').is(':checked');
	if(ck_post_now==true){
		date = getDateNow();
	}else if(ck_post_after==true){
		date = date_post;	
	}
	return date;
}
function setID() {
	var max=0;
	$.each(list,function (i,value) {
		if(max < list[i].id){
			max = list[i].id;
		}
	})
	max++
	return max;
}
function setInsert() {
	var title = $('#title_insert').val();
	var list = $('#list_insert').val();
	var date = datePostInsert();
	var status =  $('#status_insert').val();;
	var content = $('#content_insert').val();
	var email = $('#email_insert').val();
	var sdt = $('#sdt_insert').val();
	var id = setID();
	var tag = strTag(arrTag);
	var rs = 
		{
			"id": id,
			"title": title,
			"list": list,
			"date": date,
			"status":status,
			"content":content,
			"email":email,
			"sdt":sdt,
			"tag": tag
		}						
	
	return rs;
}
function reload(){
	var tbody = $("#datatable").find("tbody");
	$.each(tbody, function(key,value){
		if(key>0){
			$(tbody[key]).remove();
		}
	});
}
function strTag(arr) {
	var strNameTag = "";
	$.each($(arr),function (i,item) {
		strNameTag= strNameTag+item+',' ;
	})
	return strNameTag;
}
//CLOSE INSERT
//OPEN TAG

function loadTag() {				
		var row = $('#tagName');
		var form1 = row.find('span'); // must be the name of the card
		var $form1 = form1.clone();
		$(form1).remove();
		$.each($(arrTag),function (i,item) {
			form1.clone().appendTo(row);
			var index =  row.find('span')[i];
			$(index).find('i').text(item);

			$(index).find('i').click(function () {
				if(confirm("Bạn có muốn xóa tag không")){
			    arrTag.splice(arrTag.indexOf(item),1);		
				reloadTag('#tagName')
				loadTag();			
			}
			})
		})	
}
function loadTagEdit() {				
		var row = $('#tagName_up');
		var form1 = row.find('span'); // must be the name of the card
		var $form1 = form1.clone();
		$(form1).remove();
		$.each($(arrTagEdit),function (i,item) {
			form1.clone().appendTo(row);
			var index =  row.find('span')[i];
			$(index).find('i').text(item);

			$(index).find('i').click(function () {
				if(confirm("Bạn có muốn xóa tag không")){
			    arrTagEdit.splice(arrTagEdit.indexOf(item),1);		
				reloadTag('#tagName_up')
				loadTagEdit();			
			}
			})
		})	
}
function addTag() {
	$('#btn_add_tag').click(function () {
		reloadTag('#tagName');
		var tagname = $('#tag_insert').val();
		if(checkExistTag(tagname)==false){
			arrTag.push(tagname);
		}
		$('#tag_insert').val("");	
		loadTag();	
	})
	$('#btn_add_tag_up').click(function () {
		reloadTag('#tagName_up');
		var tagname = $('#tag_update').val();
		if(checkExistTag(tagname)==false){
			arrTagEdit.push(tagname);
		}
		$('#tag_update').val("");	
		loadTagEdit();	
	})
}
function checkExistTag(nametag) {
	var kt = false;
	$.each($(arrTag),function (i,item) {
		if(item.toLowerCase() == nametag.toLowerCase()){
				kt = true;
				return false;
		}
	})
	return kt;
}
function reloadTag(id_tagName){
		var tagname = $(id_tagName).find("span");
		$.each(tagname, function(key,value){
			if(key>0){
				$(tagname[key]).remove();
			}
		});
}
function removeTag(nametag) {
	$.each($(arrTag), function(i,item){
		if(nametag==item){
			arrTag.splice(i,1);
		}			
	});
}

//CLOSE TAG
//OPEN RESET
function reset_insert() {
		 $('#title_insert').val("");
	 	 $('#content_insert').val("");
		 $('#rad_post_insert').prop('checked',true);
		 $('#rad_post_after').prop('checked',false);
		 $('#email_insert').val("");
		 $('#sdt_insert').val("");
		 $('#link_insert').text("");
		 $('#list_insert').val("");
		 if(arrTag.length != 0 ){
				arrTag.length = 0;		
		 }
}
function reset_update() {
		 $('#title_update').val("");
	 	 $('#content_update').val("");
		 $('#email_update').val("");
		 $('#sdt_update').val("");
		 $('#link_update').text("");
		 $('#list_update').val("");
		 if(arrTagEdit.length != 0 ){
				arrTagEdit.length = 0;		
		 }
}
function reset() {
	$('#btn_rs_insert').click(function () {
	 	reset_insert();
 	})
 	$('#btn_rs_update').click(function () {
	 	reset_update();
 	})
}
//CLOSE RESET
//OPEN UPDATE
// get tag from list
function splitStr(str) {
	arrTagEdit = str.split(',');
	$.each($(arrTagEdit),function (i,item) {
		if(item==""){
			arrTagEdit.splice(arrTagEdit.indexOf(item),1);
		}
	}) 	 
}
function fillData(data) {
			$('#id_update').hide();
			$('#id_update').val(data.id);
			$('#title_update').val(data.title);
			$('#list_update').val(data.list);	
		 	$('#content_update').val(data.content);		
		 	$('#status_update').val(data.status);
	 		var status = $('#status_update').val();
	 		splitStr(data.tag);
	 		reloadTag('#tagName_up');
	 		loadTagEdit();
			if(status=="Duyệt"){
				 $('#rad_post_update').prop('checked',true);
				 $('#rad_post_after_update').prop('checked',false);				 
			}else if(status=="Đặt lịch"){
				 $('#rad_post_update').prop('checked',false);
				 $('#rad_post_after_update').prop('checked',true);
				 $('#date_update').val(data.date);
			}
		 $('#email_update').val(data.email);
		 $('#sdt_update').val(data.sdt);
}
function update() {
	$('#btn_post_update').click(function () {
		if(validateNull('#title_update')==true){
			alert("Tiêu đề không để trống");
		}else if(characterLimit('#content_update')==true){
			alert("Nội dung không được nhỏ hơn 200 kí tự");
		}else if(charSpecial('#content_update')==true){
			alert("Nội dung không chứa các kí tự (>, <, &, )");
		}else if(validateEmail('#email_update')==false){
			alert("Mail không hợp lệ ví dụ: abc@gmail.com");
		}else if(validatePhone('#sdt_update')==false){
			alert("Số điện thoại không đúng: 10 hoặc 11 số vd: 01xxx, 09xxx,08xxx");
		}else{
				var id = $('#id_update').val()
				$.each(list,function (i,data) {		
					if(data.id == id){
						list[i].title = $('#title_update').val();
						list[i].list = $('#list_update').val();
						list[i].content = $('#content_update').val();									
						list[i].email = $('#email_update').val();
						list[i].sdt = $('#sdt_update').val();
						list[i].tag =strTag(arrTagEdit); 
						alert("Sửa thành công");
						reload();
						loadData();
					}
				});
		}
			
	})
					
}
//CLOSE UPDATE
//OPEN VIEW
function fillDataView(data) {			
	$('#title_view').val(data.title);
	$('#content_view').val(data.content);		
	$('#status_view').val(data.status);
	$('#date_view').val(data.date);		
	$('#list_view').val(data.list);		
	$('#email_view').val(data.email);
	$('#sdt_view').val(data.sdt);
	fillUrl('#title_view','link_view')
}
//CLOSE VIEW
//OPEN DATEPOST
function fillId(data) {
	$('#id_date_posst').hide();
	$('#id_date_posst').val(data.id);
}
function datePost() {
	$('#btn_date_post').click(function () {
		if(validateNull('#date_d')==false ){
			var id = $('#id_date_posst').val()
			$.each(list,function (i,data) {		
				if(data.id == id){
					list[i].date = $('#date_d').val();
					list[i].status = "Đặt lịch";												
					alert("Đặt lịch thành công");
					reload();
					loadData();
				}
			});	
		}else{
			alert("Ngày đặt không để trống");
		}		
	});
}
//CLOSE DATEPOST
//OPEN CHOSEALL
function uncheckall() {
	$('#uncheck_all').hide();
	$('#check_all').show();
	$('.cbx_chose').prop('checked',false);
	if(arrId.length != 0 ){
			arrId.length = 0;		
	}	
}
function checkAll() {
	$('#uncheck_all').hide();
	//checkall
	$('#check_all').click(function () {
		$('#uncheck_all').show();
		$('#check_all').hide();
		$('.cbx_chose').prop('checked',true);
		$.each(list,function (i,data) {	
			if(arrId.length===0){
				arrId.push(data.id);
				// alert("thêm: "+ arrId[i]);
			}else {
				if(checkExist(data.id)==false){
		    	arrId.push(data.id);
		    	// alert("thêm: "+ arrId[i]);
		    	}
			}		    				
		});			
	});
	//uncheckall
	$('#uncheck_all').click(function () {
			 uncheckall();					
	});

}
function checkExist(id) {
	var kt;
	$.each($(arrId),function (key,item) {
		if (id==item){
			kt = true;
			return false;
		}else{
			kt = false;
		}
	})	
	return kt;
}
//CLOSE CHOSEALL
//OPEN BLOCKALL
function changeStatus(id,status) {
	$.each(list,function (i,data) {
		if(data.id == id){
			data.status = status;
		}
	})
}
function blockAll() {
	$('#block_all').click(function () {
		if(confirm("Bạn có muốn chặn tất cả không")){
			$.each($(arrId),function (i,item) {
				changeStatus(item,"Chặn");
			})
			uncheckall();
			reload();
			loadData();
		}
	})
	
}

//CLOSE BLOCKALL
//OPEN APPRAVALALL
function appravalAll() {
	$('#appraval_all').click(function () {
		if(confirm("Bạn có muốn duyệt tất cả không")){
			$.each($(arrId),function (i,item) {
			changeStatus(item,"Duyệt");
			})
			uncheckall();
			reload();
			loadData();
		}
		
	})
	
}

//CLOSE APPRAVALALL
function checkIdDelete(id) {
	var kt = false;
	$.each($(arrId),function (i,item) {
			if(item==id){
				kt = true;
				return false;	// like break;
			}	
	});
	return kt;
}
//OPEN DELETEALL
function deleteAll() {	
	$('#delete_all').click(function () {
		if(confirm("Bạn có muốn xóa tất cả không")){
			$.each($(list),function (i,data) {
					if(checkIdDelete(data.id)==true){						
						list.splice(0,1);
					}
			});
			uncheckall();
			reload();
			loadData();
		}
	})
	
}

//CLOSE DELETEALL
//OPEN VALIDATE
function chageSlug(str) {   
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y");                               
    str = str.replace(/đ/g,"d");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    str = str.replace(/ + /g," "); 
    str = str.replace(/[^a-z0-9-]/gi, '-');
    str = str.trim(); 
    return str;
}

function autoGenUrl(id_title,id_link) {
	$(id_title).keyup(function () {
		var title = $(id_title).val();
		var url = "http//localhost/title/"+ chageSlug(title);
		$(id_link).text(url);
	})	
}
function fillUrl(id_title,id_link) {
	var title = $(id_title).val();
	var url = "http//localhost/title/"+ chageSlug(title);
	$(id_link).text(url);
}
//textbox not null
function validateNull(id_text) {
	var kt = false;
	var str = $(id_text).val();
	if(str==""){
		kt = true;
	}
	return kt;
}
// character limit
function characterLimit(id_text) {
	var kt = false;
	var count = $(id_text).val().length;
	if(count < 200){	
		kt=true;
	}
	return kt;	
}
//character special
function charSpecial(id_text) {
	var kt = false;
	var special = />|<|&/g;
	if(special.test($(id_text).val()) == true){  // test return boolean
  		kt = true;
	}
	return kt;	
}
//email
function validateEmail(id_email) {
	var kt = false;
	var email = $(id_email).val();
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (filter.test(email)) {
       kt= true;
    } 
    return kt;
}

//PHONE
function validatePhone(id_phone) {
    var kt = false;
    var phone = $(id_phone).val().trim(); 
    phone = phone.replace('(+84)', '0');
    phone = phone.replace('+84', '0');
    phone = phone.replace('0084', '0');
    phone = phone.replace(/ /g, '');
    if (phone != '') {
        var firstNumber = phone.substring(0, 2);
        if ((firstNumber == '09' || firstNumber == '08') && phone.length == 10) {
            if (phone.match(/^\d{10}/)) {
                kt = true;
            }
        } else if (firstNumber == '01' && phone.length == 11) {
            if (phone.match(/^\d{11}/)) {
                kt = true;
            }
        }
    }
    return kt;
}
//CLOSE VALIDATE