const pdpWish = document.getElementById('pdpWish');
if (pdpWish) {
  pdpWish.addEventListener('click', () => {
    pdpWish.classList.toggle('active');
    const icon = pdpWish.querySelector('i');
    if (!icon) return;

    icon.classList.toggle('fa-regular');
    icon.classList.toggle('fa-solid');
  });
}

const pdpQtyMinus = document.getElementById('pdpQtyMinus');
const pdpQtyPlus = document.getElementById('pdpQtyPlus');
const pdpQtyValue = document.getElementById('pdpQtyValue');
if (pdpQtyMinus && pdpQtyPlus && pdpQtyValue) {
  pdpQtyMinus.addEventListener('click', () => {
    const quantity = Math.max(1, parseInt(pdpQtyValue.value || '1', 10) - 1);
    pdpQtyValue.value = quantity;
  });

  pdpQtyPlus.addEventListener('click', () => {
    const quantity = parseInt(pdpQtyValue.value || '1', 10) + 1;
    pdpQtyValue.value = quantity;
  });
}

const pdpTabButtons = document.querySelectorAll('.pdp-tabs__btn');
const pdpTabPanels = document.querySelectorAll('.pdp-tabs__panel');
if (pdpTabButtons.length && pdpTabPanels.length) {
  pdpTabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const tabId = button.getAttribute('data-tab');
      const panel = document.getElementById(`tab-${tabId}`);
      if (!panel) return;

      pdpTabButtons.forEach((tabButton) => {
        tabButton.classList.remove('active');
        tabButton.setAttribute('aria-selected', 'false');
      });
      pdpTabPanels.forEach((tabPanel) => tabPanel.classList.remove('active'));

      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');
      panel.classList.add('active');
    });
  });
}