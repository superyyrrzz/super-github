const defaultReviewerInfos = [
    {
        userName: "928PJY",
        userId: "17958546"
    },
    {
        userName: "herohua",
        userId: "2174068"
    },
    {
        userName: "superyyrrzz",
        userId: "3831744"
    },
    {
        userName: "vicancy",
        userId: "668244"
    },
    {
        userName: "vwxyzh",
        userId: "2705828"
    }
]

$(".discussion-sidebar").on('DOMSubtreeModified', addDefaultReviewerOfDocfx);

function addDefaultReviewerOfDocfx() {

    if (!isReviewsPartReady()) {
        return;
    }

    $(".discussion-sidebar").off('DOMSubtreeModified', addDefaultReviewerOfDocfx);


    if ($(".sidebar-assignee .js-issue-sidebar-form span.css-truncate").text().indexOf("Loading suggestions...") == -1);
    {
        var existedSuggestions = [];
        $(".sidebar-assignee .js-issue-sidebar-form span.css-truncate p span.css-truncate-target").text(function (index, text) {
            existedSuggestions.push(text.trim());
        });

        var currentUser = $('meta[name=user-login]').attr("content");
        var suggestions = [];
        defaultReviewerInfos.forEach(function (info) {
            if (existedSuggestions.indexOf(info.userName) == -1 && info.userName != currentUser) {
                suggestions.push(info);
            }
        })

        if ($(".sidebar-assignee .js-issue-sidebar-form span.css-truncate p.text-gray-light").text().trim() !== "Suggestions"
            && suggestions.length > 0) {
            $(".sidebar-assignee .js-issue-sidebar-form span.css-truncate")
                .first()
                .append("<p class=\"text-gray-light\">Suggestions</p>");
        }

        suggestionsQuery = $(".sidebar-assignee .js-issue-sidebar-form span.css-truncate").first();
        suggestions.forEach(function (info) {
            suggestionsQuery = suggestionsQuery.append(generateSuggestionHtml(info.userName, info.userId));
        });
    }

    $(".discussion-sidebar").on('DOMSubtreeModified', addDefaultReviewerOfDocfx);
}

function isReviewsPartReady() {
    return $(".sidebar-assignee .js-issue-sidebar-form .discussion-sidebar-heading")
        .first()
        .text()
        .trim() === "Reviewers";
}

function generateSuggestionHtml(userName, userId) {
    return "<p><span class=\"tooltipped tooltipped-nw tooltipped-multiline float-right\" aria-label=\""
        + userName
        + " is a default reviewer of DocFX\"><svg aria-hidden=\"true\" class=\"octicon octicon-info text-gray-light\" height=\"16\" version=\"1.1\" viewBox=\"0 0 14 16\" width=\"14\"><path fill-rule=\"evenodd\" d=\"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z\"></path></svg></span><button name=\"suggested_reviewer_id\" value=\""
        + userId
        + "\" type=\"submit\" class=\"text-left btn-link no-underline link-gray tooltipped tooltipped-n js-suggested-reviewer\" aria-label=\"Request review from "
        + userName
        + "\"><img alt=\"@"
        + userName
        + "\" class=\"avatar\" height=\"20\" src=\"https://avatars2.githubusercontent.com/u/"
        + userId
        + "?v=3&amp;s=40\" width=\"20\">\n<span class=\"css-truncate-target text-bold v-align-middle\">"
        + userName
        + "</span></button></p>";
}