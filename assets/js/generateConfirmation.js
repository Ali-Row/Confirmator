const generateConfirmation = (time, name, email, timeZone, link) => {

    let studentName = $('#studentNameInput').val().trim();
    let studentEmail = $('#studentEmailInput').val().trim();
    let graduationDate = moment($('#graduationDateInput').val().trim()).format('L');
    let studentLink = $('#studentLinkInput').val().trim();
    let copyFromRoster = $('#copyFromRosterInput').val().trim();
    let date = moment().add(1,'days').format('dddd, MMMM Do');
    let subjectDate = moment().add(1,'days').format('Do MMMM');
    let sessionTime = $('#timeInput').val().trim();
    let studentTimeZone;
    let EST = $('input[name="EST"]:checked').val();
    let CST = $('input[name="CST"]:checked').val();
    let PST = $('input[name="PST"]:checked').val();
    let GMT = $('input[name="GMT"]:checked').val();
    let CEST = $('input[name="CEST"]:checked').val();
    let ACDT = $('input[name="ACDT"]:checked').val();
    let AEST = $('input[name="AEST"]:checked').val();
    let AEDT = $('input[name="AEDT"]:checked').val();
    let AWST = $('input[name="AWST"]:checked').val();
    let Mountain = $('input[name="Mountain"]:checked').val();

    let tutorName = getTutorName();

    let rosterArr = copyFromRoster.split("\t");

        if (rosterArr.length > 1) {
            graduationDate = rosterArr[1];
            studentName = rosterArr[2];
            studentEmail = rosterArr[3];
            studentTimeZone = rosterArr[5];
            studentLink = rosterArr[6];
        }

        // If the info isn't filled out, use the info that is passed in via the functions params 
        !sessionTime ? sessionTime = time : sessionTime;   
        !studentName ? studentName = name : studentName;
        !studentEmail ? studentEmail = email : studentEmail;
        !studentTimeZone ? studentTimeZone = timeZone : studentTimeZone;
        !studentLink ? studentLink = link : studentLink;
        
        
        EST ? studentTimeZone = EST : null;
        CST ? studentTimeZone = CST : null;
        PST ? studentTimeZone = PST : null;
        GMT ? studentTimeZone = GMT : null;
        CEST ? studentTimeZone = CEST : null;
        ACDT ? studentTimeZone = ACDT : null;
        AEST ? studentTimeZone = AEST : null;
        AEDT ? studentTimeZone = AEDT : null;
        AWST ? studentTimeZone = AWST : null;
        Mountain ? studentTimeZone = Mountain : null;
     
        let studentObj = new Student(sessionTime, studentName, studentEmail, graduationDate, studentTimeZone, studentLink);

        // Convert 24h to 12h format, remove or comment out this line if you want to revert to 24h
        sessionTime = moment(sessionTime, "H:mm").format("hh:mm A");

        let subject = `Coding Boot Camp - Tutorial Confirmation - ${subjectDate} ${sessionTime} ${studentTimeZone}`;

        let confirmation = `

        Hi ${studentName}! ${`<br><br>`}

        Thank you for scheduling your session with me. I am looking forward to our session on ${date} at ${sessionTime} ${studentTimeZone}. ${`<br><br>`} 

        If something comes up and the scheduled time will not work, ${`<strong>`} let me know a minimum of 6 hours before the appointment time ${`</strong>`} and we’ll figure something out. ${`<br><br>`}

        This session will take place here: ${`<a href="${studentLink}">${studentLink}</a>`} ${`<br><br>`}

        &nbsp;(If you have not used zoom before please join the meeting at least 15 minutes early because it may have you download and install some software.) ${`<br><br>`}

        Again, all I need from you: ${`<br>`} 

        ${`<ul>
            <li>Be on Tutors & Students Slack 5 minutes before your time slot.</li>
            <li>Make sure your computer/mic/internet connection are working.</li>
            <li>Make sure your workspace is quiet and free from interruptions.</li>
            <li>At the end of the session, I will provide you with a link to a 2 minute evaluation form that you are required to complete.</li>
        </ul>`} ${`<br>`}

        Slack or email me with any questions.  I’m looking forward to our meeting! ${`<br><br>`}

        ${`<strong>`} Please Reply All to this email so that I know you have seen it. ${`</strong>`} ${`<br><br>`}

        ${`<strong>`} (CC Central Support on all tutor email by always using REPLY ALL). ${`</strong>`} ${`<br><br>`}

        Sincerely, ${'<br>'}
        ${tutorName}
        `

    let emailSubject = $('#subject');
    let emailConfirmation = $('#confirmation');
    emailSubject.addClass('white p-4 shadow');
    emailConfirmation.addClass('white p-4 shadow');

    let hrTag = $('<hr>');
    let sendConfirmationBtn = $('<a href="mailto:' + studentEmail + '?cc=centraltutorsupport@bootcampspot.com&subject=' + subject + '" target="_blank">Send Confirmation</a>');
    let copyToClipboardBtn = $('<button>');

    copyToClipboardBtn.addClass('btn btn-primary rounded-pill bl-grd-btn mx-4 shadow copy-to-clipboard-btn');
    copyToClipboardBtn.text('Copy To Clipboard')
    sendConfirmationBtn.addClass('btn btn-primary rounded-pill bl-grd-btn text-white font shadow send-confirmation-btn');
    
    emailSubject.html('<h2 class="text-center">' + subject + '</h2>' + '<br>');
    emailConfirmation.html('<br><br>' + confirmation + '<br>');
    emailSubject.append(hrTag, sendConfirmationBtn, copyToClipboardBtn);

    return studentObj;
}
