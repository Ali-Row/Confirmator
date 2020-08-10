
    /* New feature idea's! 
       Use mail:to attr to auto send emails
       Use some kind of browser timezone detection to auto adjust timezone ie. 
       I type in the time I see in my calendar and if I click CST it would auto deduct the time difference
    */

    const generateConfirmation = (name, email, timeZone) => {

        let studentName = $('#studentNameInput').val();
        let studentEmail = $('#studentEmailInput').val();
        let date = moment().add(1,'days').format('dddd, MMMM Do');
        let subjectDate = moment().add(1,'days').format('Do MMMM');
        let time = $('#timeInput').val();
        let studentTimeZone;
        let EST = $('input[name="EST"]:checked').val();
        let CST = $('input[name="CST"]:checked').val();
        let PST = $('input[name="PST"]:checked').val();
        let link = 'https://zoom.us/j/12345';

        // Convert 24h to 12h format, remove or comment out this line if you want to revert to 24h
        time = moment(time, "H:mm").format("hh:mm A");

            if (!studentName) {
                studentName = name;
            }
            if (!studentEmail) {
                studentEmail = email;
            }
            if (!studentTimeZone) {
                studentTimeZone = timeZone;
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

            This session will take place here: ${`<a href="${link}">${link}</a>`} ${`<br><br>`}

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
            Alistair

            `

        // Render to the page
        let sub = $('#subject');
        let con = $('#confirmation');
        sub.addClass('white');
        sub.addClass('p-4');
        con.addClass('white');
        con.addClass('p-4');
        // Generates the mail link and renders it to the page
        let mailTo = $('<a href="mailto:' + studentEmail + '?cc=centraltutorsupport@bootcampspot.com&subject=' + subject + '" target="_blank">Send Confirmation</a>');
        mailTo.addClass('bold')

        sub.html('<h2>' + subject + '</h2>' + '<br>');
        con.html('<br><br>' + confirmation + '<br>');
        con.prepend(mailTo)
        
        save(studentName, studentEmail, studentTimeZone);
    }

    // When called this will generate a student object
    class Student {
        constructor(name, email, timeZone) {
            this.name = name;
            this.email = email;
            this.timeZone = timeZone;
        }
    }

    // Saving to local storage
    let save = (name, email, timeZone) => {
        let student = new Student(name, email, timeZone)
        let studentData = JSON.parse(window.localStorage.getItem('students')) || [];
        studentData.push(student)
        window.localStorage.setItem('students', JSON.stringify(studentData))
    }

    // Rendering buttons from local storage
    let renderButtons = () => {
        let students = JSON.parse(localStorage.getItem('students'));

        students.forEach((person, i) => {
            let btn = $('<button>').text(person.name);
            btn.addClass('btn btn-primary rounded-pill person');
            btn.attr('id', i);

            let ulTag = $('<ul>');
            let liTag = $('<li>');
            liTag.append(btn);
            ulTag.append(liTag);
            // Show buttons on the page
            $('#studentBtns').append(ulTag);
        })

    }

        // When each student button is clicked
        $(document).on('click', '.person', () => {
            let id = parseInt($(this).attr('id'));
            let students = JSON.parse(localStorage.getItem('students'));
            let person = students[id];
            generateConfirmation(person.name, person.email, person.timeZone);
        });
        
  
    // When the generate button is clicked
    $('#generate').on('click', (e) => {
        e.preventDefault();
        renderButtons();
    })

    renderButtons();

