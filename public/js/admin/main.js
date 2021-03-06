let timer;
let timerInterval = 100;
let username_autocomplete = $('#username-autocomplete');

username_autocomplete.keyup(function(){
    clearTimeout(timer);
    timer = setTimeout(getUsers, timerInterval);
});

username_autocomplete.keydown(function(){
    clearTimeout(timer);
});

$("body").on('click', 'ul#ajax-users-list li', (e) => {
    $("#acc").val($(e.target).data('id'));
    $("#username-autocomplete").val($(e.target).data('username'));
    $('ul#ajax-users-list').remove();
});

username_autocomplete.blur(() => {
    setTimeout(() => {$('ul#ajax-users-list').hide()}, 200);
});

username_autocomplete.focus(() => {
    $('ul#ajax-users-list').show();
});

let showUsers = data =>
{
    $('ul#ajax-users-list').remove();

    let list = "<ul id='ajax-users-list'>Choose one:";
    data.forEach( account => {
      list += `<li data-id="${account.id}" data-username="${account.username}">${account.username}</li>`;
    });
    list += "</ul>";

    username_autocomplete.after(list);
}

let getUsers = () =>
{
    if (username_autocomplete.val().length < 3)
      return;

    $.post("/admin/getusers",
    {
        username: username_autocomplete.val(),
        _token: $("meta[name='_token']").attr('content')
    }, showUsers);
}

let setActiveLink = name =>
{
    $("ul.side-menu li a").removeClass('active');
    $(`ul.side-menu li a#${name}-link`).addClass('active');
}
