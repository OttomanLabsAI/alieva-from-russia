function toggleNav(btn){
  const links=document.getElementById('navlinks');
  const open=links.classList.toggle('open');
  btn.setAttribute('aria-expanded',open);
}
document.querySelectorAll('#navlinks a').forEach(a=>a.addEventListener('click',()=>{
  document.getElementById('navlinks').classList.remove('open');
  document.querySelector('.menu-btn').setAttribute('aria-expanded','false');
}));
