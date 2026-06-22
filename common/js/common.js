//한글만 입력
function onlyKorean(form_name) {
	for (var i = 0; i < form_name.value.length; i++) {
		var chr = form_name.value.charAt(i);
		if (chr.charCodeAt() < '129') {
			alert("한글로만 입력해 주세요");
			form_name.focus();
			form_name.value = "";
		}
	}
};
//숫자만 입력
function onlyNumber(event) {
	event = event || window.event;
	var keyID = (event.which)
		? event.which
		: event.keyCode;
	if ((keyID >= 48 && keyID <= 57) || (keyID >= 96 && keyID <= 105) || keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39)
		return;
	 else
		return false;
};
//숫자만 입력
function removeChar(event) {
	event = event || window.event;
	var keyID = (event.which)
		? event.which
		: event.keyCode;
	if (keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39)
		return;
	 else
		event.target.value = event
			.target
			.value
			.replace(/[^0-9]/g, "");
};

function emailCheck(email_address){		
	email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
	if(!email_regex.test(email_address)){ 
		return false; 
	}else{
		return true;
	}
}

$(function() {
	//전화번호 11자리가 인푸트 1개로 표현된 페이지에 유효성 검사
	$(".tel_check").on("keyup", function() {
		var value = $(this).val(),
		addValue = [];
		value = value.replace(/-/gi, '');
		if (value.length >= 3) { 
			if (value.substring(0, 2) == '02') { // 서울 번호를 체크하기 위한 조건
				addValue.push(value.substring(0, 2)); 
				if (value.length >= 3) { 
					var endKey = (value.length >= 10 ? 6 : 5); // 00-000-000, 00-0000-0000 처리 
					addValue.push(value.substring(2, endKey)); 
					if (value.length >= 6) { 
						if (value.length >= 10) { // 10자리 이상 입력 방지
							value = value.substring(0, 10); 
						}
						addValue.push(value.substring(endKey, value.length)); 
					}
				}
			} else { 
				addValue.push(value.substring(0, 3)); 
				if (value.length >= 4) { 
					var endKey = (value.length >= 11 ? 7 : 6); // 000-000-0000, 000-0000-0000 처리 
					addValue.push(value.substring(3, endKey)); 
					if (value.length >= 7) { 
						if (value.length >= 11) {
							value = value.substring(0, 11); 
						}
						addValue.push(value.substring(endKey, value.length)); 
					}
				}
			}
			$(this).val(addValue.join("-")); 
		}
	});
});

//입력값 체크
var checkForm = function () {
	if ( $("#agree1").length > 0 ) {
		if(!$("#agree1").is(":checked")){
			alert("이용약관에 동의해주세요.");
			return false;
		}
	}
	if ( $("#agree2").length > 0 ) {
		if(!$("#agree2").is(":checked")){
			alert("개인정보처리방침에 동의해주세요.");
			return false;
		}
	}

	if ( location.search == "?kakao" ){
		$("#referrer").val("카카오톡");
	} else {
		$("#referrer").val(document.referrer);
	}

	return true;
};


$(document).on("change",".filebox_wrap .filebox_input input",function(){
	if ( $(this).parents(".filebox_input").is(".filebox_type_img") ) {
		var file_type=$(this).val().split(".").pop().toLowerCase();
		if ($.inArray(file_type, [ "jpg","jpeg","png" ])==-1){
			alert("jpg, png 파일만 업로드 가능합니다.");
			$(this).parents(".filebox_wrap").find(".filebox_name input").val("");
			$(this).parents(".filebox_wrap").find(".filebox_input input").val("");
			$(this).parents(".filebox_wrap").find(".filebox_img img").attr("src", "");
			return;
		}
	} else if ( $(this).parents(".filebox_input").is(".filebox_type_survey") ) {
		var file_type=$(this).val().split(".").pop().toLowerCase();
		if ($.inArray(file_type, ["doc", "docx", "hwp", "hwpx", "jpg", "png", "pdf", "jpeg", "gif", "bmp", "webp", "xls", "xlsx", "ppt", "zip"])==-1){
			alert("doc, docx, hwp, hwpx, jpg, png, pdf, jpeg, gif, bmp, webp, xls, xlsx, ppt, zip 파일만 업로드 가능합니다.");
			$(this).parents(".filebox_wrap").find(".filebox_name input").val("");
			$(this).parents(".filebox_wrap").find(".filebox_input input").val("");
			$(this).parents(".filebox_wrap").find(".filebox_img img").attr("src", "");
			return;
		}
	};
	if(window.FileReader) {
		var filename = $(this)[0].files[0].name;
		var parent = $(this).parent();
		var reader = new FileReader();
		reader.onload = function(e) {
			var src = e.target.result;
			parent.parents(".filebox_wrap").find(".filebox_img img").attr("src", src);
		}
		reader.readAsDataURL($(this)[0].files[0]);
	} else {
		var filename = $(this).val().split("/").pop().split("\\").pop();
	};
	$(this).parents(".filebox_wrap").find(".filebox_name input").val(filename);
});
$(document).on("click",".file_reset",function(){
	$(this).parents(".filebox_wrap").find(".filebox_name input").val("");
	$(this).parents(".filebox_wrap").find(".filebox_input input").val("");
	if ( $(this).parents(".filebox_wrap").find(".filebox_img") ) {
		$(this).parents(".filebox_wrap").find(".filebox_img img").attr("src", "");
	};
});

$(document).on("click",".modal_open",function(){
	if ( $(this).is(".db_modal") ) {
		$(".modal_db .modal-dialog").addClass("modal-dialog_720");
		$(".modal_db").modal();
	};
	if ( $(this).is(".terms_modal1") ) {
		$.ajax({
			url: "../terms/terms1.php",
			type: "GET",
			success:function(data){
				$(".modal1 .modal-dialog").addClass("modal-dialog_720");
				$(".modal1 .modal-content").html(data);
				$(".modal1").modal();
			}
		});
	};
	if ( $(this).is(".terms_modal2") ) {
		$.ajax({
			url: "../terms/terms2.php",
			type: "GET",
			success:function(data){
				$(".modal1 .modal-dialog").addClass("modal-dialog_720");
				$(".modal1 .modal-content").html(data);
				$(".modal1").modal();
			}
		});
	};
	if ( $(this).is(".modal_open_policy_plus1") ) {
		$.ajax({
			url: "/common/modal/policy_plus1.php",
			type: "GET",
			success:function(data){
				$(".modal .modal-dialog").addClass("modal-dialog_480");
				$(".modal .modal-content").html(data);
				$(".modal").modal();
			}
		});
	};
});

function go_top() {
	$("html, body").stop().animate({
		scrollTop: $("html").offset().top
	});
}
function go_link() {
	if ( $(".db_wrap").length > 0 ) {
		$("html, body").stop().animate({
			scrollTop: $(".db_wrap").offset().top
		});
	}
}
function go_link2() {
	if ( $(".db_wrap2").length > 0 ) {
		$("html, body").stop().animate({
			scrollTop: $(".db_wrap2").offset().top
		});
	}
}