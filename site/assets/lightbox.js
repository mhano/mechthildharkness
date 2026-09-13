// Click-to-zoom for photos. Progressive enhancement only: if this
// fails to load for any reason, photos just aren't clickable — the
// page still works fine. No dependencies.
(function () {
	"use strict";

	var dialog = document.createElement("dialog");
	dialog.className = "lightbox";
	dialog.innerHTML =
		'<button type="button" class="lightbox-close" aria-label="Close">&times;</button>' +
		'<img alt="">' +
		'<p class="lightbox-caption"></p>';
	document.body.appendChild(dialog);

	var img = dialog.querySelector("img");
	var caption = dialog.querySelector(".lightbox-caption");
	var closeButton = dialog.querySelector(".lightbox-close");

	function openFor(sourceImg) {
		img.src = sourceImg.currentSrc || sourceImg.src;
		img.alt = sourceImg.alt || "";
		var figcaption = sourceImg.closest("figure");
		figcaption = figcaption ? figcaption.querySelector("figcaption") : null;
		caption.textContent = figcaption ? figcaption.textContent : "";
		caption.hidden = !caption.textContent;
		dialog.showModal();
	}

	document.querySelectorAll(".content figure.photo img").forEach(function (photo) {
		photo.addEventListener("click", function () {
			openFor(photo);
		});
	});

	closeButton.addEventListener("click", function () {
		dialog.close();
	});

	// click on the backdrop (the dialog element itself, outside its content box) closes it
	dialog.addEventListener("click", function (event) {
		if (event.target === dialog) dialog.close();
	});
})();
