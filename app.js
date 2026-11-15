'use strict';
const $=s=>document.querySelector(s);
const scene=$('.scene'), dialog=$('#skill-panel'), inspect=$('#inspect');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const query=new URLSearchParams(location.search);
let slot=0, position=0, frame=0, returnFocus, lastWheel=-Infinity;
let width=0,height=0,drag,suppressClick=false;
const props = [
  ['iot', 'Programming & IoT', 'Turning ideas into working systems.', 'prop-4'],
  ['ai', 'AI Tools & Exploration', 'Exploring ideas and improving workflows with AI.', 'prop-ai'],
  ['photography', 'Photography & Visual Production', 'From capturing moments to creating complete visual experiences.', 'prop-0'],
  ['drone', 'Drone & VR', 'Exploring new perspectives through technology.', 'prop-1'],
  ['marketing', 'Marketing & Sales', 'Understanding needs and turning ideas into value.', 'prop-marketing'],
  ['teamwork', 'Communication & Teamwork', 'Connecting people and moving forward together.', 'prop-teamwork'],
  ['making', 'Making & Tools', 'Learning by doing and finding practical solutions.', 'prop-2'],
  ['climbing', 'Climbing & Exploration', 'Staying focused, adapting and overcoming challenges.', 'prop-3']
];
const count=props.length, step=Math.PI*2/count;
const items=props.map(([id, name, description, asset],i)=>{
  const button=document.createElement('button');
  button.className='object';
  button.dataset.skill = id;
  button.type='button';
  button.setAttribute('aria-label',name);
  button.setAttribute('aria-haspopup','dialog');
  button.style.setProperty('--i',i);
  const image = new Image();
  image.src = 'assets/' + asset + '.webp';
  image.alt = '';
  image.draggable = false;
  button.append(image);
  button.addEventListener('click',()=>{
    if(suppressClick) return;
    const active=index(slot);
    const delta=((i-active+count+count/2)%count)-count/2;
    select(slot+delta);
    openPanel(button);
  });
  $('.objects').append(button);
  return button;
});
function index(v){return ((v%count)+count)%count}
function render(){
  const mobile=width<560;
  const r=width*(mobile ? .377 : .34);
  const depth=height*(mobile ? .225 : .195);
  const tilt=r*(mobile ? .16 : .12);
  items.forEach((el,i)=>{
    const a=(i-position)*step;
    const z=Math.cos(a), u=Math.sin(a);
    // Offset the far arc so the rear object reads beside Lucky's silhouette.
    const rearOffset = Math.pow(Math.max(0, -z), 5);
    const x = width / 2 + u * r + rearOffset * (mobile ? 82 : 125);
    const y = height * .655 + z * depth - u * tilt - rearOffset * 36;
    const scale=(mobile?.80:.84)+z*.26;
    el.style.transform=`translate3d(${x}px,${y}px,0) translate(-50%,-50%) scale(${scale})`;
    el.style.zIndex=z<-.05?2:z<.58?6:7+Math.round(z*3);
    el.style.opacity=(.82+.18*z).toFixed(2);
  });
}
function update(){
  const i=index(slot);
  $('#capability').textContent=props[i][2];
  $('#skill').textContent=props[i][1];
  $('#inspect small').textContent = props[i][0] === 'iot' ? 'View IoT projects ↗' : 'Inspect object ↗';
  items.forEach((el,n)=>{
    el.classList.toggle('active',n===i);
    if(n===i) el.setAttribute('aria-current','true'); else el.removeAttribute('aria-current');
  });
}
function select(target){
  cancelAnimationFrame(frame);
  slot=target;
  update();
  if(reduced.matches){position=slot;render();return}
  const from=position, start=performance.now();
  function tick(now){
    const t=Math.min(1,(now-start)/330);
    position=from+(target-from)*(1-Math.pow(1-t,3));
    render();
    if(t<1)frame=requestAnimationFrame(tick);
  }
  frame=requestAnimationFrame(tick);
}
function openPanel(trigger, skill = props[index(slot)][0]){
  returnFocus=trigger;
  $('#panel-title').textContent = renderPortfolio(skill);
  dialog.classList.add('has-portfolio');
  if (!dialog.open) dialog.showModal();
  $('#close').focus({preventScroll: true});
  dialog.scrollTo(0, 0);
}
dialog.addEventListener('close',()=>returnFocus?.focus({preventScroll:true}));
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
$('#close').onclick=$('#back').onclick=()=>dialog.close();
inspect.onclick=()=>openPanel(inspect);
$('#meet-lucky').onclick=()=>openPanel($('#meet-lucky'), 'meet');
$('#prev').onclick=()=>select(slot-1);
$('#next').onclick=()=>select(slot+1);
document.addEventListener('keydown',e=>{
  if(dialog.open||e.altKey||e.ctrlKey||e.metaKey||!['ArrowLeft','ArrowRight'].includes(e.key))return;
  e.preventDefault();
  select(slot+(e.key==='ArrowRight'?1:-1));
});
scene.addEventListener('wheel',e=>{
  if(e.ctrlKey)return;
  const delta=Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:e.deltaY;
  if(!delta)return;
  e.preventDefault();
  if(performance.now()-lastWheel<270)return;
  lastWheel=performance.now();
  select(slot+Math.sign(delta));
},{passive:false});
scene.addEventListener('pointerdown',e=>{
  if(!e.isPrimary||e.button!==0)return;
  suppressClick=false;
  drag={id:e.pointerId,x:e.clientX,from:position,moved:false};
});
scene.addEventListener('pointermove',e=>{
  if(!drag||drag.id!==e.pointerId)return;
  const dx=e.clientX-drag.x;
  if(!drag.moved && Math.abs(dx)<8)return;
  if(!drag.moved){
    drag.moved=true;
    cancelAnimationFrame(frame);
    scene.setPointerCapture(e.pointerId);
    scene.classList.add('dragging');
  }
  position=drag.from-dx/Math.max(43,width/10);
  render();
});
function endDrag(e){
  if(!drag||drag.id!==e.pointerId)return;
  if(drag.moved){
    suppressClick=true;
    scene.classList.remove('dragging');
    select(Math.round(position));
    setTimeout(()=>{suppressClick=false},0);
  }
  drag=null;
}
scene.addEventListener('pointerup',endDrag);
scene.addEventListener('pointercancel',endDrag);
scene.addEventListener('pointerleave',e=>{if(!drag?.moved)endDrag(e)});
new ResizeObserver(()=>{width=scene.clientWidth;height=scene.clientHeight;render()}).observe(scene);
width=scene.clientWidth;height=scene.clientHeight;
render();
update();
reduced.addEventListener('change', () => { if (reduced.matches) select(slot); });
if(query.get('panel')==='example')openPanel(inspect);
