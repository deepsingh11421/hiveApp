var score = 170;
var total = 500;
var percent = (score/total)*100;
console.log(percent);
var pageNo = 'secondPage';

document.getElementById('wpmScoreBar').style.width = percent + '%';

var modalPage = {
    firstPage: `
        <div id="modal">
            <div class="modalBack">
                <i class="fas fa-arrow-left"></i>
            </div>
            <div id="modalContent" class="modalContent">
                <img src="./assets/image/Screenshot (134).png" height="50%"/>
                
                <div class="modalText">
                    Hi,How are you?
                    <div class="modalTextDropperUp"></div>
                </div>
                <div class="modalText" style="color: rgb(255, 72, 246);">
                    Hello,I'm Good
                    <div class="modalTextDropper"></div>
                </div>
                <div class="modalNext" style="padding: 25px;background-image: radial-gradient(#7A0BAA,#310046);border: 4px solid rgb(161, 161, 161);box-shadow: none;" onclick="pageChange('secondPage')">
                    
                </div>
            </div>
        </div>
    `,
    secondPage: `
    <div class="modalBack" onclick="pageChange('firstPage')">
            <i class="fas fa-arrow-left"></i>
    </div>
    <div id="modalContent" class="modalContent">
        <div>
            <div class="modalText">
                I can help provide your complete personality assessment
                <div class="modalTextDropper"></div>
            </div>
            <div class="modalImg">
                <img src="./assets/image/Screenshot_129.png"/>
            </div>
        </div>
        <div class="modalNext" onclick="pageChange('thirdPage')">
            <i class="fas fa-arrow-right"></i>
        </div>
    </div>
    `,
    thirdPage: `
    <div class="modalBack" onclick="pageChange('secondPage')">
            <i class="fas fa-arrow-left"></i>
    </div>
    <div id="modalContent" class="modalContent">
        <div>
            <div class="modalText">
                I can help provide your complete personality assessment
                <div class="modalTextDropper"></div>
            </div>
            <div class="modalImg">
                <img src="./assets/image/Screenshot_130.png"/>
            </div>
        </div>
        <div class="modalMid">
            <b>P5</b> Power of Communication
        </div>
        <div class="modalNext" onclick="pageChange('fourthPage')">
            <i class="fas fa-arrow-right"></i>
        </div>
    </div>
    `,
    fourthPage: `
    <div class="modalBack" onclick="pageChange('thirdPage')">
            <i class="fas fa-arrow-left"></i>
    </div>
    <div id="modalContent" class="modalContent">
        <div>
            <div class="modalText">
                I can help provide your complete personality assessment
                <div class="modalTextDropper"></div>
            </div>
            <div class="modalImg">
                <img src="./assets/image/Screenshot_132.png"/>
            </div>
        </div>
        <div class="modalMid">
            <b>P5</b> Power of Communication
        </div>
        <div class="modalNext" onclick="pageChange('fifthPage')">
            <i class="fas fa-arrow-right"></i>
        </div>
    </div>
    `,
    fifthPage: `
    <div class="modalBack" onclick="pageChange('fourthPage')">
            <i class="fas fa-arrow-left"></i>
    </div>
    <div id="modalContent" class="modalContent">
        <div>
            <div class="modalText">
                Briefly help me identify yourself for AI to be more precise
                <div class="modalTextDropper"></div>
            </div>
            <div id="modalImg" class="modalImg">
                <div onclick='addActive(event)'>
                    <img src="./assets/image/cs4.png"/>
                    Student
                </div>
                <div onclick='addActive(event)'><img src="./assets/image/cs4.png"/>Teacher</div>
                <div onclick='addActive(event)'><img src="./assets/image/cs4.png"/>Working Professional</div>
                <div onclick='addActive(event)'><img src="./assets/image/cs4.png"/>Others</div>
            </div>
        </div>
        <div class="modalNext" onclick="pageChange('lastPage','check')">
            <i class="fas fa-arrow-right"></i>
        </div>
    </div>
    `,
    lastPage: `
        <div id="modal">
            <div class="modalBack" onclick="pageChange('fifthPage')">
                <i class="fas fa-arrow-left"></i>
            </div>
            <div id="modalContent" class="modalContent" style="font-family: 'Montserrat', sans-serif;justify-content: center;padding-bottom: 60px;height: 80%;">
                <img src="./assets/image/Screenshot (134).png" height="40%"/>
                    <div style="margin-top: 10px; font-size: 1.5rem; color: #450F6A;">
                        <b>Well Done !</b>
                    </div>
                    <div style="color: grey;">
                        <b>Let's analysis your report</b>
                    </div>
                    <img src="./assets/image/parameter-icons-25.png" width="50px" style="margin-top: 20px;"/>
                    <div class="modalMid" onclick="modalStop()" style="padding: 10px 20px; width: 80%;cursor:pointer;">
                        <b>View Report</b>
                    </div>
            </div>
        </div>
    `
}

function addActive(event){
    console.log(event.path[1].id);
    console.log(event.path);
    var list = document.getElementsByClassName('activeModalBtn');
    for(let i=0;i<list.length;i++){
        list[i].classList.remove('activeModalBtn');
    }
    if(event.path[1].id !== 'modalImg' ){
        event.path[1].classList.add('activeModalBtn');
    }else{
        event.path[0].classList.add('activeModalBtn')
    }
}

function pageChange(pageName,check='no'){
    if(check !== 'no'){
        if(document.getElementsByClassName('activeModalBtn').length === 0){
            return;
        }
    }
    document.getElementById('modal').style.opacity = '0';

    setTimeout(function(){
        document.getElementById('modal').innerHTML = modalPage[pageName];
        document.getElementById('modal').style.opacity = '1';
    },500);
}

function modalStop(){
    document.getElementById('modalMain').style.display = 'none';
    document.getElementById('App').style.display = 'block';
}