const renderEditModal = (id) => {
    if (!id) return;

    $('#renderModal').append(`
    <div class="bd modal fade text-light" id="editModal" tabindex="-1" aria-labelledby="editModal" aria-hidden="true">
    <div class="bd modal-dialog bg-dark rounded-more">
        <div class="bd modal-content bg-dark">
        <div class="bd modal-header bg-dark d-flex justify-content-start">
        <img class="edit-info-img" src="https://img.icons8.com/color/344/user-folder.png" alt="User Folder icon">
            <h4 class="mx-2 modal-title">Edit Student Info</h4> 
        </div>
        <div class="bd modal-body p-4 bg-dark">
        <div class="form-floating mb-2">
            <input type="time" class="form-control rounded shadow" id="newTime" placeholder="Session Time">
            <label for="floatingInput">Session Time</label>
        </div>
        <div class="form-floating mb-2">
            <input type="input" class="form-control" id="newName" placeholder="Student Name">
            <label for="floatingInput">Student Name</label>
        </div>
        <div class="form-floating mb-2">
            <input type="email" class="form-control" id="newEmail" placeholder="Student Email">
            <label for="floatingPassword">Student Email</label>
        </div>
        <div class="form-floating mb-2">
            <input type="text" class="form-control" id="newGradDate" placeholder="Graduation Date">
            <label for="floatingPassword">Graduation Date</label>
        </div>
        <div class="form-floating mb-2">
            <input type="input" class="form-control" id="newLink" placeholder="Student Link">
            <label for="floatingPassword">Student Link</label>
        </div>
        <div class="form-floating mb-2">
            <input type="input" class="form-control" id="newTimeZone" placeholder="Student Time Zone">
            <label for="floatingPassword">Student Time Zone</label>
        </div>
        </div>
        <div class="bd modal-footer bg-dark">
            <button type="button" class="btn btn-secondary gy-grd-btn rounded-0 rounded-left shadow" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary bl-grd-btn rounded-0 rounded-right shadow" data-bs-dismiss="modal" id="saveNewInfo">Save</button>
        </div>
        </div>
    </div>
    </div>
  `)
  let students = getStudents();
  let person = students[id];

    $('#saveNewInfo').on('click', function() {
        let newTime = $('#newTime').val();
        let newName = $('#newName').val().trim();
        let newEmail = $('#newEmail').val().trim();
        let newGradDate = $('#newGradDate').val().trim();
        let newLink = $('#newLink').val().trim();
        let newTimeZone = $('#newTimeZone').val().trim();

        person.time = newTime;
        person.name = newName;
        person.email = newEmail;
        person.gradDate = newGradDate;
        person.link = newLink;
        person.timeZone = newTimeZone;

        setStudents(students);
        window.location.reload();
    })

    $('#newTime').val('');
    $('#newName').val(person.name);  
    $('#newEmail').val(person.email);  
    $('#newLink').val(person.link);
    $('#newGradDate').val(person.gradDate);
    $('#newTimeZone').val(person.timeZone);  
}

const renderModal = () => {
    $('#renderModal').append(`
    <div class="bd modal fade text-light" id="tutorSignInModal" tabindex="-1" aria-labelledby="tutorSignInModal" aria-hidden="true">
    <div class="bd modal-dialog bg-dark rounded-more">
        <div class="bd modal-content bg-dark">
        <div class="bd modal-header bg-dark d-flex justify-content-start">
            <img class="sign-in-modal-img" src="https://img.icons8.com/fluent/344/user-male-circle.png" alt="User icon">
            <h4 class="mx-2 modal-title">Sign In</h4> 
        </div>
        <div class="bd modal-body p-4 bg-dark">
            <div class="form-floating mb-1">
                <input type="input" class="form-control rounded shadow" id="tutorNameInput" placeholder="Tutor First Name">
                <label for="floatingInput">Tutor First Name</label>
            </div>
        </div>
        <div class="bd modal-footer bg-dark">
            <button type="button" class="btn btn-secondary gy-grd-btn rounded-0 rounded-left shadow" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary bl-grd-btn rounded-0 rounded-right shadow" data-bs-dismiss="modal" id="saveName">Save</button>
        </div>
        </div>
    </div>
    </div>
  `)
}