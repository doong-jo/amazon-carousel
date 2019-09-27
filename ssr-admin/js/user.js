async function fetchUserData() {
    const users = await fetch("/user", {
        method: "GET",
        query: {}
    });

    return users;
}

$(document).ready(async function() {
    $("#dataTable").DataTable();
    const userData = await fetchUserData();
    console.log(await userData.json());
});
