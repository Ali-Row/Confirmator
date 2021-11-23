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

const renderButtons = () => {
    $('#studentBtns').empty();
    let students = JSON.parse(window.localStorage.getItem('students'));
    const studentsExist = students || '';
    studentsExist ? renderStudentButtons(students) : renderPlaceholderButtons();
}

const renderStudentButtons = (students) => {
    $('#studentBtns').empty();
    students.forEach((person, i) => {
        let sessionTime = moment(person.time, "H:mm").format("hh:mm A");
        let studentTitle;
        let studentSessionTime;
        let timeZone;
        person.timeZone ? timeZone = person.timeZone : timeZone = 'No time zone saved';
        person.name ? studentTitle = `${person.name.split(' ')[0]}'s Session Time` : studentTitle = '🚫 &nbsp; No student name saved';
        sessionTime === 'Invalid date' ? studentSessionTime = '⚠️ No session time saved' : studentSessionTime = `⏰ &nbsp; ${sessionTime} ${timeZone}`;
        
        let deleteBtn = $('<button><i class="fas fa-times"></i>');
        let editBtn = $('<button><i class="fas fa-pen"></i>');
        let studentBtn = $(`<button tabindex="0" data-bs-toggle="popover" data-bs-trigger="hover focus" title="${studentTitle}" data-bs-content="${studentSessionTime}">`).text(person.name);

        let isAutoDelete = localStorage.getItem('auto-delete');

        let currentDate = moment(moment().format('L'));
        let studentGraduationDate = moment(person.gradDate); 

        // If auto delete is switched on and the students graduation date has passed then remove all of those students.
        if (isAutoDelete === 'true' && currentDate.isAfter(studentGraduationDate)) deleteStudent(i);
        
        // If a graduation date exists check it, if the date has passed then make the buttons red to alert the user.
            if (currentDate.isAfter(studentGraduationDate)) {
                let hasGraduatedTitle = `${person.name.split(' ')[0]} Graduated`
                let hasGraduatedText = "Delete this student?";
                studentBtn = $(`<button tabindex="0" data-bs-toggle="popover" data-bs-trigger="hover focus" title="${hasGraduatedTitle}" data-bs-content="${hasGraduatedText}">`).text(person.name);

                deleteBtn.addClass('del-graduation-btn');
                editBtn.addClass('del-graduation-btn');
                studentBtn.addClass('graduation-btn');
            }
        
        
        deleteBtn.addClass('btn btn-danger rounded-0 mb-1 rounded-left delete del-grd-btn shadow');
        editBtn.addClass('btn btn-primary rounded-0 mb-1 edit del-grd-btn bl shadow');
        studentBtn.addClass('btn btn-primary rounded-0 mb-1 rounded-right person bl-grd-btn bl shadow');
        
        deleteBtn.attr('id', i);
        editBtn.attr('id', i);
        editBtn.attr('data-bs-toggle', 'modal');
        editBtn.attr('data-bs-target', '#editModal');
        studentBtn.attr('id', i);
        let col = $('<div class="col-md-4 d-flex">');
        col.append(deleteBtn, editBtn, studentBtn);
    
        $('#studentBtns').append(col);
    })
}

const renderPlaceholderButtons = () => {
    for (let i = 0; i < 12; i++) {
            
        let greyDeleteBtn = $('<div><i class="fas fa-times grey-icon"></i>');
        let greyEditBtn = $('<div><i class="fas fa-pen grey-icon"></i>')
        let greyStudentBtn = $('<div>');
        
        greyDeleteBtn.addClass('btn btn-secondary rounded-0 mb-1 grey-delete rounded-left greyBtnBlock shadow');
        greyEditBtn.addClass('btn btn-primary rounded-0 mb-1 greyBtnBlock bl-grey shadow')
        greyStudentBtn.addClass('btn btn-primary rounded-0 mb-1 grey-person rounded-right greyBtnBlock bl-grey shadow');
        let col = $('<div class="col-md-4 d-flex animate__animated animate__jackInTheBox animate__delay-1s animate__faster">');
        col.append(greyDeleteBtn, greyEditBtn, greyStudentBtn);
    
        $('#studentBtns').append(col);
    }
}