
    /* New feature idea's! 
       Use mail:to attr to auto send emails
       Use some kind of browser timezone detection to auto adjust timezone ie. 
       I type in the time I see in my calendar and if I click CST it would auto deduct the time difference
    */

    const generateConfirmation = (name, email, timeZone, link) => {

        let studentName = $('#studentNameInput').val();
        let studentEmail = $('#studentEmailInput').val();
        let studentLink = $('#studentLinkInput').val();
        let date = moment().add(1,'days').format('dddd, MMMM Do');
        let subjectDate = moment().add(1,'days').format('Do MMMM');
        let time = $('#timeInput').val();
        let studentTimeZone;
        let EST = $('input[name="EST"]:checked').val();
        let CST = $('input[name="CST"]:checked').val();
        let PST = $('input[name="PST"]:checked').val();
        let tutorName = getTutorName();

        // Convert 24h to 12h format, remove or comment out this line if you want to revert to 24h
        time = moment(time, "H:mm").format("hh:mm A");

            if (!studentName && !studentEmail && !studentTimeZone && !studentLink) {
                studentName = name;
                studentEmail = email;
                studentTimeZone = timeZone;
                studentLink = link;
            }

            if (EST) {
                studentTimeZone = EST;
            } else if (CST) {
                studentTimeZone = CST;
            } else if (PST) {
                studentTimeZone = PST;
            }


            let subject = `Coding Boot Camp - Tutorial Confirmation - ${subjectDate} ${time} ${studentTimeZone}`;

            let confirmation = `

            Hi ${studentName}! ${`<br><br>`}

            Thank you for scheduling your session with me. I am looking forward to our session on ${date} at ${time} ${studentTimeZone}. ${`<br><br>`} 

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
        con.addClass('white');
        con.addClass('p-4');
        // Generates a clickable mail link and renders it to the page
        let mailTo = $('<a href="mailto:' + studentEmail + '?cc=centraltutorsupport@bootcampspot.com&subject=' + subject + '" target="_blank">Send Confirmation</a>');
        mailTo.addClass('bold')

        sub.html('<h2>' + subject + '</h2>' + '<br>');
        con.html('<br><br>' + confirmation + '<br>');
        con.prepend(mailTo)
        
        save(studentName, studentEmail, studentTimeZone, studentLink);
    }

    // When called this constructor will generate a student object
    class Student {
        constructor(name, email, timeZone, link) {
            this.name = name;
            this.email = email;
            this.timeZone = timeZone;
            this.link = link;
        }
    }

    // Saving to local storage
    let save = (name, email, timeZone, link) => {
        let student = new Student(name, email, timeZone, link);
        let studentData = JSON.parse(window.localStorage.getItem('students')) || [];
        studentData.push(student);
        window.localStorage.setItem('students', JSON.stringify(studentData))
    }

    // Rendering buttons from local storage
    function renderButtons() {
        let students = JSON.parse(window.localStorage.getItem('students'));
        $('#studentBtns').empty();

        students.forEach((person, i) => {
            let deleteBtn = $('<button><i class="fas fa-trash-alt"></i>');
            let btn = $('<button>').text(person.name);
            deleteBtn.addClass('btn btn-danger mr-2 rounded-pill delete');
            btn.addClass('btn btn-primary rounded-pill person');
            deleteBtn.attr('id', i);
            btn.attr('id', i);
            let ulTag = $('<ul>');
            let liTag = $('<li>');
            ulTag.addClass('no-bullet-points')
            liTag.append(btn);
            liTag.prepend(deleteBtn);
            ulTag.append(liTag);
            // Show buttons on the page
            $('#studentBtns').append(ulTag);
        })
    }

        // When each student button is clicked
        $(document).on('click', '.person', function() {
            let id = parseInt($(this).attr('id'));
            let students = JSON.parse(localStorage.getItem('students'));
            let person = students[id];
            generateConfirmation(person.name, person.email, person.timeZone, person.link);
        });

         // When each delete button is clicked
         $(document).on('click', '.delete', function() {
            let id = parseInt($(this).attr('id'));
            let students = JSON.parse(localStorage.getItem('students'));
            students.splice(id, 1);
            window.localStorage.setItem('students', JSON.stringify(students));
            document.location.reload();
        });

        // When the add tutor button is clicked
        $(document).on('click', '#addTutorBtn', function() {
            let name = prompt('Enter your first name');
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
            if (name) {
                $('#addTutorBtn').text('Welcome Back ' + name);
            } else {
                $('#addTutorBtn').html('<i class="fas fa-user"></i> Add Name');
            }
            return name;
        }
        
        
    // When the generate button is clicked
    $('#generate').on('click', (e) => {
        e.preventDefault();
        generateConfirmation();
        renderButtons();
    })

    renderButtons();
    getTutorName();
