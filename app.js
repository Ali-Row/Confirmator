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

            // If no data is typed into the input fields it will try to use the args we passed into the function
            !sessionTime ? sessionTime = time : sessionTime;   
            !studentName ? studentName = name : studentName;
            !studentEmail ? studentEmail = email : studentEmail;
            !studentTimeZone ? studentTimeZone = timeZone : studentTimeZone;
            !studentLink ? studentLink = link : studentLink;
            
            // If a particular timezone is checked use that ones value else return null
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

        // Render to the page
        let sub = $('#subject');
        let con = $('#confirmation');
        sub.addClass('white');
        sub.addClass('p-4');
        sub.addClass('shadow');
        con.addClass('white');
        con.addClass('p-4');
        con.addClass('shadow');

        // Generates a clickable mail link and renders it to the page, when clicked this link will auto fill the email
        let mailTo = $('<a href="mailto:' + studentEmail + '?cc=centraltutorsupport@bootcampspot.com&subject=' + subject + '" target="_blank">Send Confirmation</a>');
        mailTo.addClass('bold');
        let hrTag = $('<hr>');
        
        sub.html('<h2>' + subject + '</h2>' + '<br>');
        con.html('<br><br>' + confirmation + '<br>');
        con.prepend(hrTag);
        con.prepend(mailTo);
      
        return studentObj;
    }

    // When called this constructor will generate a student object
    class Student {
        constructor(time, name, email, timeZone, link) {
            this.time = time;
            this.name = name;
            this.email = email;
            this.timeZone = timeZone;
            this.link = link;
        }
    }

    // Saving to local storage
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

    // Rendering buttons from local storage
    function renderButtons() {
        let students = JSON.parse(window.localStorage.getItem('students'));
       // empty the div before rendering
        $('#studentBtns').empty();

        // If there are students show the Saved Students text on the page
        if (students[0]) {  
            $('#studentText').text('Saved Students');
            students.forEach((person, i) => {
                let deleteBtn = $('<button><i class="fas fa-trash-alt"></i>');
                let btn = $('<button>').text(person.name);
                deleteBtn.addClass('btn btn-danger rounded-0 mb-1 rounded-left delete del-grd-btn shadow');
                btn.addClass('btn btn-primary rounded-0 mb-1 rounded-right person bl-grd-btn bl shadow');
                deleteBtn.attr('id', i);
                btn.attr('id', i);
                let col = $('<div class="col-md-4">');
                col.append(deleteBtn);
                col.append(btn);
            
            
                // Show buttons on the page
                $('#studentBtns').append(col);
            })
        }
    }

        // When each student button is clicked
        $(document).on('click', '.person', function() {
            let id = parseInt($(this).attr('id'));
            let students = JSON.parse(localStorage.getItem('students'));
            let person = students[id];
            console.log(person.time)
            generateConfirmation(person.time, person.name, person.email, person.timeZone, person.link);
        })

        // When each delete button is clicked
        $(document).on('click', '.delete', function() {
            let id = parseInt($(this).attr('id'));
            let students = JSON.parse(localStorage.getItem('students'));
            students.splice(id, 1);
            window.localStorage.setItem('students', JSON.stringify(students));
            document.location.reload();
        })

        // When the add tutor button is clicked render the modal
        $(document).on('click', '#addTutorBtn', function() {
            renderModal();
        })

        // Saves the tutor first name that was entered into the modal
        $(document).on('click', '#saveName', function() {
            let name = $('#tutorNameInput').val();
            setTutorName(name);
            window.location.reload();
        })

        // Saves tutors first name to local storage
        setTutorName = (name) => {
            window.localStorage.setItem('tutorName', JSON.stringify(name));
        }

        // Gets and renders tutors first name from local storage
        let getTutorName = () => {
            let name = JSON.parse(window.localStorage.getItem('tutorName'));
            name ? $('#addTutorBtn').text(name) : $('#addTutorBtn').html('<i class="fas fa-user"></i>');
            return name;
        }

        let renderModal = () => {
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

    // When the generate button is clicked it renders and saves to local storage
    $('#generate').on('click', (e) => {
        e.preventDefault();
        generateConfirmation();
        let student = generateConfirmation();
        save(student.time, student.name, student.email, student.timeZone, student.link);
        renderButtons();
    })

    // By default we want to render anything from local storage that we have saved such as student names and the tutors first name
    renderButtons();
    getTutorName();
    renderModal();
