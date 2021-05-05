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
    let students = JSON.parse(window.localStorage.getItem('students'));
    $('#studentBtns').empty();

    const studentsExist = students[0];

    if (studentsExist) {  
        students.forEach((person, i) => {
            let sessionTime = moment(person.time, "H:mm").format("hh:mm A");
            let studentTitle;
            let studentSessionTime;
            person.name ? studentTitle = `${person.name.split(' ')[0]}'s Session Time` : studentTitle = '🚫 &nbsp; No student name saved';
            sessionTime === 'Invalid date' ? studentSessionTime = '⚠️ No session time saved' : studentSessionTime = `⏰ &nbsp; ${sessionTime} ${person.timeZone}`;
            
            let deleteBtn = $('<button><i class="fas fa-times"></i>');
            let editBtn = $('<button><i class="fas fa-pen"></i>');
            let studentBtn = $(`<button tabindex="0" data-bs-toggle="popover" data-bs-trigger="hover focus" title="${studentTitle}" data-bs-content="${studentSessionTime}">`).text(person.name);
            
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
    } else {

        for (let i = 0; i < 12; i++) {
            
            let deleteBtn = $('<div><i class="fas fa-times grey-icon"></i>');
            let editBtn = $('<div><i class="fas fa-pen grey-icon"></i>')
            let studentBtn = $('<div>');
            
            deleteBtn.addClass('btn btn-secondary rounded-0 mb-1 grey-delete rounded-left greyBtnBlock shadow');
            editBtn.addClass('btn btn-primary rounded-0 mb-1 greyBtnBlock bl-grey shadow')
            studentBtn.addClass('btn btn-primary rounded-0 mb-1 grey-person rounded-right greyBtnBlock bl-grey shadow');
            let col = $('<div class="col-md-4 d-flex animate__animated animate__jackInTheBox animate__delay-1s animate__faster">');
            col.append(deleteBtn, editBtn, studentBtn);
        
            $('#studentBtns').append(col);
        }
    }
}
