class Student {
    constructor(time, name, email, gradDate, timeZone, link) {
        this.time = time;
        this.name = name;
        this.email = email;
        this.gradDate = gradDate;
        this.timeZone = timeZone;
        this.link = link;
    }
}

const saveStudent = (time, name, email, gradDate, timeZone, link) => {
    let student = new Student(time, name, email, gradDate, timeZone, link);
    let studentData = JSON.parse(window.localStorage.getItem('students')) || [];
    studentData.push(student);

    // Sorts the students from A - Z
    for(i in studentData) {
        studentData = (studentData.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))); 
    }
    window.localStorage.setItem('students', JSON.stringify(studentData));
}

const deleteStudent = (id) => {
    let students = JSON.parse(localStorage.getItem('students'));
    students.splice(id, 1);
    window.localStorage.setItem('students', JSON.stringify(students));
    renderButtons();
}

const getAutoDeleteStudent = () => {
    let isAutoDelete = localStorage.getItem('auto-delete');
    let checkbox = $('#autoDeleteStudentCheckbox');

    if (isAutoDelete === 'true') {
        checkbox.attr('checked', 'true');
    } else {
        checkbox.removeAttr('checked');
    }
}

const saveAutoDeleteStudent = (e) => {
    const isChecked = e.target;
    if (isChecked.getAttribute('checked')) {
        localStorage.setItem('auto-delete', false);
        getAutoDeleteStudent();
    } else {
        localStorage.setItem('auto-delete', true);
        getAutoDeleteStudent();
    }
}

const setTutorName = (name) => {
    window.localStorage.setItem('tutorName', JSON.stringify(name));
}

const getTutorName = () => {
    let name = JSON.parse(window.localStorage.getItem('tutorName'));
    name ? $('#addTutorBtn').text(name) : $('#addTutorBtn').html('<i class="fas fa-user"></i>');
    return name;
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
    renderAlert();
}

renderButtons();
getTutorName();
renderModal();
getAutoDeleteStudent();
