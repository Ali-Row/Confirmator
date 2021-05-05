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
            let deleteBtn = $('<button><i class="fas fa-times"></i>');
            let editBtn = $('<button><i class="fas fa-pen"></i>')
            let btn = $('<button>').text(person.name);
            
            deleteBtn.addClass('btn btn-danger rounded-0 mb-1 rounded-left delete del-grd-btn shadow');
            editBtn.addClass('btn btn-primary rounded-0 mb-1 edit del-grd-btn bl shadow')
            btn.addClass('btn btn-primary rounded-0 mb-1 rounded-right person bl-grd-btn bl shadow');
            deleteBtn.attr('id', i);
            editBtn.attr('id', i);
            editBtn.attr('data-bs-toggle', 'modal');
            editBtn.attr('data-bs-target', '#editModal');
            btn.attr('id', i);
            let col = $('<div class="col-md-4 d-flex">');
            col.append(deleteBtn);
            col.append(editBtn)
            col.append(btn);
        
            $('#studentBtns').append(col);
        })
    } else {
        for (let i = 0; i < 12; i++) {
            let greyBtnBlock = $('<div>');
            greyBtnBlock.addClass('greyBtnBlock rounded-pill shadow animate__animated animate__jackInTheBox animate__delay-1s animate__faster');
            let col = $('<div class="col-md-4">');
            col.append(greyBtnBlock);
        
            $('#studentBtns').append(col);
        }
    }
}
