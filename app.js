    const generateConfirmation = (time, name, email, timeZone, link) => {

        let studentName = $('#studentNameInput').val();
        let studentEmail = $('#studentEmailInput').val();
        let studentLink = $('#studentLinkInput').val();
        let date = moment().add(1,'days').format('dddd, MMMM Do');
        let subjectDate = moment().add(1,'days').format('Do MMMM');
        let sessionTime = $('#timeInput').val();
        let studentTimeZone;
        let EST = $('input[name="EST"]:checked').val();
        let CST = $('input[name="CST"]:checked').val();
        let PST = $('input[name="PST"]:checked').val();
        let GMT = $('input[name="GMT"]:checked').val();
        let ACDT = $('input[name="ACDT"]:checked').val();
        let AEST = $('input[name="AEST"]:checked').val();
        let AEDT = $('input[name="AEDT"]:checked').val();
        let AWST = $('input[name="AWST"]:checked').val();
        let Mountain = $('input[name="Mountain"]:checked').val();

        let tutorName = getTutorName();

            !sessionTime ? sessionTime = time : sessionTime;   
            !studentName ? studentName = name : studentName;
            !studentEmail ? studentEmail = email : studentEmail;
            !studentTimeZone ? studentTimeZone = timeZone : studentTimeZone;
            !studentLink ? studentLink = link : studentLink;
            
            EST ? studentTimeZone = EST : null;
            CST ? studentTimeZone = CST : null;
            PST ? studentTimeZone = PST : null;
            GMT ? studentTimeZone = GMT : null;
            ACDT ? studentTimeZone = ACDT : null;
            AEST ? studentTimeZone = AEST : null;
            AEDT ? studentTimeZone = AEDT : null;
            AWST ? studentTimeZone = AWST : null;
            Mountain ? studentTimeZone = Mountain : null;
         
            let studentObj = new Student(sessionTime, studentName, studentEmail, studentTimeZone, studentLink);

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
        emailSubject.addClass('white');
        emailSubject.addClass('p-4');
        emailSubject.addClass('shadow');
        emailConfirmation.addClass('white');
        emailConfirmation.addClass('p-4');
        emailConfirmation.addClass('shadow');

        let mailTo = $('<a href="mailto:' + studentEmail + '?cc=centraltutorsupport@bootcampspot.com&subject=' + subject + '" target="_blank">Send Confirmation</a>');
        let copyBtn = $('<button>');
        copyBtn.addClass('btn btn-primary copy-btn rounded-pill bl-grd-btn ml-4 shadow');
        copyBtn.text('Copy To Clipboard')
        mailTo.addClass('btn btn-primary copy-btn rounded-pill bl-grd-btn text-white font shadow');
        let hrTag = $('<hr>');
        
        emailSubject.html('<h2 class="text-center">' + subject + '</h2>' + '<br>');
        emailConfirmation.html('<br><br>' + confirmation + '<br>');
        emailSubject.append(hrTag);
        emailSubject.append(mailTo);
        emailSubject.append(copyBtn)
      
        return studentObj;
    }

    class Student {
        constructor(time, name, email, timeZone, link) {
            this.time = time;
            this.name = name;
            this.email = email;
            this.timeZone = timeZone;
            this.link = link;
        }
    }

    let save = (time, name, email, timeZone, link) => {
        let student = new Student(time, name, email, timeZone, link);
        let studentData = JSON.parse(window.localStorage.getItem('students')) || [];
        studentData.push(student);

         // Sorts the students from A - Z
         for(i in studentData) {
             studentData = (studentData.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))); 
         }
        window.localStorage.setItem('students', JSON.stringify(studentData));
    }

    let renderButtons = () => {
        let students = JSON.parse(window.localStorage.getItem('students'));
        $('#studentBtns').empty();

        const studentsExist = students[0];

        if (studentsExist) {  
            $('#studentText').text('Saved Students');
            students.forEach((person, i) => {
                let deleteBtn = $('<button><i class="fas fa-trash-alt"></i>');
                let btn;
                let displayShortenedName = person.name != null && person.name.length >= 17;
                // If the student name is too large we shorten the name and have ... appear at the end
                if (displayShortenedName) {  
                    btn = $('<button>').text(person.name.substring(0, 15) + '...');
                } else {
                    btn = $('<button>').text(person.name);
                }

                deleteBtn.addClass('btn btn-danger rounded-0 mb-1 rounded-left delete del-grd-btn shadow');
                btn.addClass('btn btn-primary rounded-0 mb-1 rounded-right person bl-grd-btn bl shadow');
                deleteBtn.attr('id', i);
                btn.attr('id', i);
                let col = $('<div class="col-md-4">');
                col.append(deleteBtn);
                col.append(btn);
            
                $('#studentBtns').append(col);
            })
        }
    }

        $(document).on('click', '.person', function() {
            let id = parseInt($(this).attr('id'));
            let students = JSON.parse(localStorage.getItem('students'));
            let person = students[id];
            console.log(person.time)
            generateConfirmation(person.time, person.name, person.email, person.timeZone, person.link);
        })

        $(document).on('click', '.delete', function() {
            let id = parseInt($(this).attr('id'));
            let students = JSON.parse(localStorage.getItem('students'));
            students.splice(id, 1);
            window.localStorage.setItem('students', JSON.stringify(students));
            document.location.reload();
        })

        $(document).on('click', '#addTutorBtn', function() {
            renderModal();
        })

        $(document).on('click', '#saveName', function() {
            let name = $('#tutorNameInput').val();
            setTutorName(name);
            window.location.reload();
        })

        setTutorName = (name) => {
            window.localStorage.setItem('tutorName', JSON.stringify(name));
        }

        const getTutorName = () => {
            let name = JSON.parse(window.localStorage.getItem('tutorName'));
            name ? $('#addTutorBtn').text(name) : $('#addTutorBtn').html('<i class="fas fa-user"></i>');
            return name;
        }

        const renderModal = () => {
            $('#renderModal').append(`
            <!-- Modal -->
            <div class="bd modal fade text-light" id="modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="bd modal-dialog bg-dark rounded-more">
                <div class="bd modal-content bg-dark">
                <div class="bd modal-header bg-dark">
                    <h4 class="modal-title" id="exampleModalLabel">Sign In</h4> 
                </div>
                <div class="bd modal-body p-4 bg-dark">
                    <label for="exampleInputEmail1">Tutor First Name</label>
                    <input type="tutorName" class="form-control rounded shadow" id="tutorNameInput" placeholder="Please enter your first name.">
                </div>
                <div class="bd modal-footer bg-dark">
                    <button type="button" class="btn btn-secondary gy-grd-btn rounded-0 rounded-left shadow" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary bl-grd-btn rounded-0 rounded-right shadow" id="saveName">Save</button>
                </div>
                </div>
            </div>
            </div>
          `)
        }

        const copyWithStyle = (element) => {
            const doc = document;
            const text = doc.getElementById(element);
            let range;
            let selection;
        
            if (doc.body.createTextRange) {
                range = doc.body.createTextRange();
                range.moveToElement(text);
                range.select();
            } else if (window.getSelection) {
                selection = window.getSelection();
                range = doc.createRange();
                range.selectNodeContents(text);
                selection.removeAllRanges();
                selection.addRange(range);
            }
            doc.execCommand('copy');
            window.getSelection().removeAllRanges();
            renderAlert()
        }

        const renderAlert = () => {
            let alert = $(".alert");
            alert.removeClass("invisible");
            alert.addClass("animate__fadeInRight")
            setTimeout(() => {
                alert.addClass("animate__fadeOut")
            }, 2000);
            setTimeout(() => {
                alert.addClass("invisible");
                alert.removeClass("animate__fadeOut")
                alert.removeClass("animate__fadeInRight")
            }, 3000);
        }

        $(document).on('click', '.copy-btn', function() {
            copyWithStyle('confirmation');
        });


    $('#generate').on('click', (e) => {
        e.preventDefault();
        generateConfirmation();
        let student = generateConfirmation();
        save(student.time, student.name, student.email, student.timeZone, student.link);
        renderButtons();
    })

    renderButtons();
    getTutorName();
    renderModal();
