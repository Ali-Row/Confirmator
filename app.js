
    function generateConfirmation() {

        let studentName = $('#studentNameInput').val();
        let date = moment().add(1,'days').format('dddd, MMMM Do');
        let subjectDate = moment().add(1,'days').format('Do MMMM')
        let time = $('#timeInput').val();
        let EST = $('input[name="EST"]:checked').val();
        let CST = $('input[name="CST"]:checked').val();
        let PST = $('input[name="PST"]:checked').val();

        // time = moment(time).format('LT');
       

            if (EST) {
                timeZone = EST;
            }
            else if (CST) {
                timeZone = CST;
            }
            else if (PST) {
                timeZone = PST
            }
        

            let subject = '<h2>' + `Coding Boot Camp - Tutorial Confirmation - ${subjectDate} ${time} ${timeZone}` + '</h2>';

            let confirmation = `
    
            Hi ${studentName}! ${'<br><br>'}

            Thank you for scheduling your session with me. I am looking forward to our session on ${date} at ${time} ${timeZone}. ${'<br><br>'} 

            If something comes up and the scheduled time will not work, let me know a minimum of 6 hours before the appointment time and we’ll figure something out. ${'<br><br>'}

            This session will take place here: https://zoom.us/j/2660527403 ${'<br><br>'}

            (If you have not used zoom before please join the meeting at least 15 minutes early because it may have you download and install some software.) ${'<br><br>'}

            Again, all I need from you: ${'<br>'} 
            Be on Tutors & Students Slack 5 minutes before your time slot. ${'<br>'}
            Make sure your computer/mic/internet connection are working. ${'<br>'}
            Make sure your workspace is quiet and free from interruptions. ${'<br>'}
            At the end of the session, I will provide you with a link to a 2 minute evaluation form that you are required to complete. ${'<br><br>'}

            Slack or email me with any questions.  I’m looking forward to our meeting! ${'<br><br>'}

            Please Reply All to this email so that I know you have seen it. ${'<br><br>'}

            (CC Central Support on all tutor email by always using REPLY ALL). ${'<br><br>'}

            Sincerely, ${'<br>'}
            Alistair
            
            `

        $('#subject').append(subject + '<br>');
        $('#confirmation').append(confirmation + '<br>');
    }

    $('#generate').one('click', (e) => {
        e.preventDefault();
        generateConfirmation();
    })



// use moment to get next day 
// use template literals to input variables into the confirmation script
// use moment to add date to subject line