var $cQivH$axios = require("axios");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
/* eslint-disable */ /* eslint-disable */ const $110322411f35e604$export$4c5dd147b21b9176 = (locations)=>{
    const map = L.map("map", {
        zoomControl: false
    });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    var greenIcon = L.icon({
        iconUrl: "/img/pin.png",
        iconSize: [
            32,
            40
        ],
        iconAnchor: [
            16,
            45
        ],
        popupAnchor: [
            0,
            -50
        ]
    });
    const points = [];
    locations.forEach((loc)=>{
        points.push([
            loc.coordinates[1],
            loc.coordinates[0]
        ]);
        L.marker([
            loc.coordinates[1],
            loc.coordinates[0]
        ], {
            icon: greenIcon
        }).addTo(map).bindPopup(`<p>Day ${loc.day}: ${loc.description}</p>`, {
            autoClose: false
        }).openPopup();
    });
    const bounds = L.latLngBounds(points).pad(0.5);
    map.fitBounds(bounds);
    map.scrollWheelZoom.disable();
};


/* eslint-disable */ 
/* eslint-disable */ const $cf8ea27b34b2137b$export$516836c6a9dfc573 = ()=>{
    const el = document.querySelector(".alert");
    if (el) el.parentElement.removeChild(el);
};
const $cf8ea27b34b2137b$export$de026b00723010c1 = (type, msg)=>{
    const markup = `<div class="alert alert--${type}">${msg}</div>`;
    document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
    window.setTimeout($cf8ea27b34b2137b$export$516836c6a9dfc573, 5000);
};


const $433b644962c26f49$export$596d806903d1f59e = async (email, password)=>{
    try {
        const res = await (0, ($parcel$interopDefault($cQivH$axios)))({
            method: "POST",
            url: "/api/v1/users/login",
            data: {
                email: email,
                password: password
            }
        });
        console.log(res);
        if (res.data.status === "success") {
            (0, $cf8ea27b34b2137b$export$de026b00723010c1)("success", "Logged in successfully!");
            window.setTimeout(()=>{
                location.assign("/");
            }, 1500);
        }
    } catch (err) {
        (0, $cf8ea27b34b2137b$export$de026b00723010c1)("error", err.response.data.message);
    }
};
const $433b644962c26f49$export$a0973bcfe11b05c9 = async ()=>{
    const res = await (0, ($parcel$interopDefault($cQivH$axios)))({
        method: "GET",
        url: "/api/v1/users/logout"
    });
    if (res.data.status === "success") location.assign("/");
};


/* eslint-disable */ 

const $6842e7be16478138$export$f558026a994b6051 = async (data, type)=>{
    try {
        const url = type === "password" ? "/api/v1/users/updatePassword" : "/api/v1/users/updateMe";
        const res = await (0, ($parcel$interopDefault($cQivH$axios)))({
            method: "PATCH",
            url: url,
            data: data
        });
        if (res.data.status === "success") {
            (0, $cf8ea27b34b2137b$export$de026b00723010c1)("success", "Setting updated successfully!");
            window.setTimeout(()=>{
                location.assign("/me");
            }, 1500);
        }
    } catch (err) {
        (0, $cf8ea27b34b2137b$export$de026b00723010c1)("error", err.response.data.message);
    }
};


const $c74e663a61ed842a$var$maxBox = document.getElementById("map");
const $c74e663a61ed842a$var$loginForm = document.querySelector(".form__login");
const $c74e663a61ed842a$var$logOutBtn = document.querySelector(".nav__el--logout");
const $c74e663a61ed842a$var$userSettingsForm = document.querySelector(".form-user-data");
const $c74e663a61ed842a$var$userPasswordForm = document.querySelector(".form-user-password");
if ($c74e663a61ed842a$var$maxBox) {
    const locations = JSON.parse($c74e663a61ed842a$var$maxBox.dataset.locations);
    (0, $110322411f35e604$export$4c5dd147b21b9176)(locations);
}
if ($c74e663a61ed842a$var$loginForm) $c74e663a61ed842a$var$loginForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    (0, $433b644962c26f49$export$596d806903d1f59e)(email, password);
});
if ($c74e663a61ed842a$var$logOutBtn) $c74e663a61ed842a$var$logOutBtn.addEventListener("click", (0, $433b644962c26f49$export$a0973bcfe11b05c9));
if ($c74e663a61ed842a$var$userSettingsForm) $c74e663a61ed842a$var$userSettingsForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    (0, $6842e7be16478138$export$f558026a994b6051)({
        name: name,
        email: email
    }, "data");
});
if ($c74e663a61ed842a$var$userPasswordForm) $c74e663a61ed842a$var$userPasswordForm.addEventListener("submit", async (e)=>{
    e.preventDefault();
    const passwordCurrent = document.getElementById("password-current").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("password-confirm").value;
    await (0, $6842e7be16478138$export$f558026a994b6051)({
        passwordCurrent: passwordCurrent,
        password: password,
        passwordConfirm: passwordConfirm
    }, "password");
});


//# sourceMappingURL=app.js.map
