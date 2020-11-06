export function toggleModal(id: string) {
  const body = document.querySelector("body");
  const modal = document.querySelector(`#${id}`);
  modal.classList.toggle("opacity-0");
  modal.classList.toggle("pointer-events-none");
  body.classList.toggle("modal-active");
}
