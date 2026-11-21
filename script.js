// Matric number -> letter link. Fill these in later, e.g. "21CJ012345": "https://..."
const letters = {
};

const input = document.getElementById('mat');
const result = document.getElementById('result');

function norm(s){ return s.trim().toUpperCase().replace(/\s+/g,''); }

function search(){
  const key = norm(input.value);
  result.textContent = '';
  if(!key) return;
  const table = {};
  for (const k in letters) table[norm(k)] = letters[k];
  const link = table[key];
  if(!link){
    const p = document.createElement('div');
    p.className = 'notfound';
    p.textContent = 'Not found';
    result.appendChild(p);
    return;
  }
  const box = document.createElement('div');
  box.className = 'found';
  const a = document.createElement('a');
  a.href = link; a.target = '_blank'; a.rel = 'noopener'; a.textContent = link;
  const btn = document.createElement('button');
  btn.type = 'button'; btn.textContent = 'Copy';
  btn.onclick = async () => {
    try { await navigator.clipboard.writeText(link); }
    catch(e){
      const t = document.createElement('textarea'); t.value = link; document.body.appendChild(t); t.select();
      try{ document.execCommand('copy'); }catch(_){} t.remove();
    }
    btn.textContent = 'Copied';
    setTimeout(()=>{ btn.textContent = 'Copy'; }, 1800);
  };
  box.append(a, btn);
  result.appendChild(box);
}
document.getElementById('go').addEventListener('click', search);
input.addEventListener('keydown', e => { if(e.key === 'Enter') search(); });
