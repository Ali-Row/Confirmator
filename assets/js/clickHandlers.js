$(document).on('click', '#addTutorBtn', function() {
    renderModal();
})

$(document).on('click', '#saveName', function() {
    let name = $('#tutorNameInput').val();
    setTutorName(name);
    getTutorName();
})

$('#generate').on('click', (e) => {
    e.preventDefault();
    generateConfirmation();
    let student = generateConfirmation();
    saveStudent(student.time, student.name, student.email, student.gradDate, student.timeZone, student.link);
    renderButtons();
})
    
$(document).on('click', '.copy-to-clipboard-btn', function() {
    copyWithStyle('confirmation');
});

$(document).on('click', '.delete', function() {
    let id = parseInt($(this).attr('id'));
    deleteStudent(id);
})

$(document).on('click', '.edit', function() {
    let studentId = $(this).attr('id');
    renderEditModal(studentId);
})

$(document).on('click', '.person', function() {
    let id = $(this).attr('id');
    let students = JSON.parse(localStorage.getItem('students'));
    let person = students[id];
    generateConfirmation(person.time, person.name, person.email, person.timeZone, person.link);
})

