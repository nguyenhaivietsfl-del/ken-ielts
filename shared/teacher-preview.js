/* KEN – Chế độ "Giáo viên xem thử": giáo viên vào học thử không cần đăng nhập như học sinh, kết quả không gửi đi. */
(function () {
  var PV_SID = '__teacher__';
  window.kenIsPreview = function () { return !!(window.student && student.sid === PV_SID); };
  function startPreview() {
    var g = window.GRADES ? GRADES[0] : undefined;
    student = { name: 'Giáo viên (xem thử)', sid: PV_SID, cls: 'GV', school: '—', teacher: '—', grade: g };
    window.KEN_PREVIEW = true;
    loadState(); if (S.data && g !== undefined && S.data.grade === undefined) S.data.grade = g;
    try { updateWho(); } catch (e) {}
    renderHome(); banner();
  }
  function banner() {
    if (document.getElementById('pvBar')) return;
    var b = document.createElement('div'); b.id = 'pvBar';
    b.style.cssText = 'position:relative;z-index:5;background:#fef3c7;color:#92400e;border-bottom:2px solid #fcd34d;padding:8px 14px;font-size:14px;font-weight:700;display:flex;gap:10px;align-items:center;justify-content:center;flex-wrap:wrap';
    b.innerHTML = '👩‍🏫 Chế độ giáo viên xem thử – tiến độ chỉ lưu trên máy này, không gửi lên bảng theo dõi. <button style="border:0;background:#92400e;color:#fff;border-radius:10px;padding:5px 12px;font-weight:700;cursor:pointer">Thoát xem thử</button>';
    b.querySelector('button').onclick = function () { location.href = location.pathname; };
    var h = document.querySelector('header'); h && h.parentNode ? h.parentNode.insertBefore(b, h.nextSibling) : document.body.prepend(b);
  }
  function check(pw, ok, fail) {
    var url = window.KEN_TRACK_URL;
    if (!url) return ok();
    fetch(url, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify({ action: 'login', pw: pw }) })
      .then(function (r) { return r.json(); }).then(function (j) { j && j.ok ? ok() : fail((j && j.error) || 'Sai mật khẩu giáo viên.'); })
      .catch(function () { fail('Không kiểm tra được mật khẩu (mất mạng?). Thử lại sau.'); });
  }
  function ask() {
    var m = document.createElement('div'); m.className = 'modal'; m.style.zIndex = 90;
    m.innerHTML = '<div class="card" style="max-width:420px;width:100%"><h2>👩‍🏫 Giáo viên xem thử</h2><p class="muted small">Nhập mật khẩu giáo viên (giống trang Khu vực giáo viên) để vào học thử mọi bài, không cần đăng nhập như học sinh.</p><input class="in" type="password" id="pvPw" placeholder="Mật khẩu giáo viên"><div class="err" id="pvErr" style="color:#d64545;min-height:20px"></div><div class="row" style="display:flex;gap:8px;justify-content:flex-end"><button class="btn" id="pvNo">Hủy</button><button class="btn pri" id="pvOk">Vào xem thử</button></div></div>';
    document.body.appendChild(m); var inp = m.querySelector('#pvPw'); inp.focus();
    function go() { var b = m.querySelector('#pvOk'); b.disabled = true; b.textContent = 'Đang kiểm tra…';
      check(inp.value.trim(), function () { try { localStorage.setItem('ken_t_pw', inp.value.trim()); } catch (e) {} m.remove(); startPreview(); }, function (msg) { m.querySelector('#pvErr').textContent = msg; b.disabled = false; b.textContent = 'Vào xem thử'; }); }
    m.querySelector('#pvOk').onclick = go; inp.onkeydown = function (e) { if (e.key === 'Enter') go(); };
    m.querySelector('#pvNo').onclick = function () { m.remove(); };
  }
  function addBtn() {
    var f = document.getElementById('lf'); if (!f || document.getElementById('pvBtn')) return;
    var d = document.createElement('div'); d.style.cssText = 'margin-top:14px;padding-top:12px;border-top:1px dashed #d0d5dd;text-align:center';
    d.innerHTML = '<button type="button" class="btn" id="pvBtn" style="width:100%">👩‍🏫 Tôi là giáo viên – vào xem thử</button>';
    f.parentNode.appendChild(d); d.querySelector('button').onclick = ask;
  }
  window.addEventListener('DOMContentLoaded', function () {
    var _rl = window.renderLogin;
    if (typeof _rl === 'function') window.renderLogin = renderLogin = function () { var r = _rl.apply(this, arguments); addBtn(); return r; };
    addBtn();
    if (/[?&]preview=1/.test(location.search)) {
      var pw = ''; try { pw = localStorage.getItem('ken_t_pw') || sessionStorage.getItem('ken_t_pw') || ''; } catch (e) {}
      if (pw) check(pw, startPreview, ask); else ask();
    }
  });
})();
