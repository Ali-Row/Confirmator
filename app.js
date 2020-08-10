
    /* New feature idea's! 
       Use mail:to attr to auto send emails
       Use some kind of browser timezone detection to auto adjust timezone ie. 
       I type in the time I see in my calendar and if I click CST it would auto deduct the time difference
    */

    const generateConfirmation = () => {

        let studentName = $('#studentNameInput').val();
        let date = moment().add(1,'days').format('dddd, MMMM Do');
        let subjectDate = moment().add(1,'days').format('Do MMMM');
        let time = $('#timeInput').val();
        let EST = $('input[name="EST"]:checked').val();
        let CST = $('input[name="CST"]:checked').val();
        let PST = $('input[name="PST"]:checked').val();
        let link = 'https://zoom.us/j/2660527403';

        // Convert 24h to 12h format, remove this line if you want to revert to 24h
        time = moment(time, "H:mm").format("hh:mm A");

            if (EST) {
                timeZone = EST;
            }
            else if (CST) {
                timeZone = CST;
            }
            else if (PST) {
                timeZone = PST;
            }
        

            let subject = '<h2>' + `Coding Boot Camp - Tutorial Confirmation - ${subjectDate} ${time} ${timeZone}` + '</h2>';

            let confirmation = `

            Hi ${studentName}! ${`<br><br>`}

            Thank you for scheduling your session with me. I am looking forward to our session on ${date} at ${time} ${timeZone}. ${`<br><br>`} 

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

        sub.html(subject + '<br>');
        con.html(confirmation + '<br>');
    }

    // When the generate button is clicked
    $('#generate').on('click', (e) => {
        e.preventDefault();
        generateConfirmation();
    })

