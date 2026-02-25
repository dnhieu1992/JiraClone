# Jira Sidebar Clone — Checklist

> Mục tiêu: implement sidebar kiểu Jira (như ảnh) cho web app của bạn.  
> Trạng thái: tick dần từng mục.

---

## 1) Khung sidebar cơ bản
- [ ] Render layout sidebar: logo/app switcher + danh sách menu + footer (nếu có)
- [ ] Collapse/Expand sidebar (icon thu gọn)
  - [ ] Expanded: icon + label
  - [ ] Collapsed: chỉ icon + tooltip khi hover
- [ ] Highlight trạng thái hiện tại: active item / selected space / focus state
- [ ] Responsive: desktop fixed; mobile dạng drawer + overlay

## 2) Navigation items (menu cấp 1)
- [ ] Điều hướng route cho các item:
  - [ ] For you
  - [ ] Recent
  - [ ] Starred
  - [ ] Apps
  - [ ] Plans
  - [ ] Filters
  - [ ] Dashboards
  - [ ] Goals
  - [ ] Teams
  - [ ] More
- [ ] Item có chevron (>): mở trang con hoặc panel phụ (tuỳ thiết kế)

## 3) Spaces section
- [ ] Expand/Collapse nhóm “Spaces”
- [ ] Recent Spaces
  - [ ] Fetch + hiển thị danh sách recent spaces
  - [ ] Click space → switch context/route theo space
  - [ ] Hiển thị icon/avatar cho space
- [ ] “More spaces”
  - [ ] Mở trang/popup xem tất cả spaces
  - [ ] Search/filter + phân trang (nếu cần)
- [ ] Nút “+” cạnh Spaces
  - [ ] Tạo space mới (form)
  - [ ] Validate + error handling
  - [ ] Check quyền hạn (permission)
- [ ] Menu “…” cạnh Spaces
  - [ ] Context menu: quản lý / settings / pin / reorder (tuỳ scope)

## 4) Recent / Starred (data behaviors)
- [ ] Recent
  - [ ] Tự động ghi nhận item đã truy cập (space/project/page/issue…)
  - [ ] Hiển thị theo thời gian, giới hạn N items
- [ ] Starred
  - [ ] Star/Unstar items
  - [ ] Hiển thị starred ưu tiên (pin lên trên nếu muốn)

## 5) Recommended / Promo card
- [ ] Render “recommended block” theo rule (feature flag / role / onboarding)
- [ ] “TRY” → mở flow onboarding / page giới thiệu
- [ ] (Optional) Dismiss/Hide card

## 6) More (overflow)
- [ ] “More” mở danh sách bổ sung (popover/drawer)
- [ ] (Optional) Search nhanh trong danh sách

## 7) UI polish
- [ ] Hover states + tooltips khi collapsed
- [ ] (Optional) Badges/counters (notification, counts)
- [ ] Skeleton/loading state khi load spaces/recents từ API
- [ ] Empty states: chưa có space / recent / starred

## 8) Permission & Personalization
- [ ] Permission-based rendering: không quyền → không hiển thị item/space
- [ ] Persist UI state
  - [ ] Lưu collapsed/expanded (localStorage hoặc server preference)
  - [ ] Nhớ section đang mở (Spaces expanded…)
- [ ] (Optional) Reorder/pin items (drag & drop) + lưu cấu hình

## 9) Accessibility & Productivity
- [ ] Keyboard navigation (tab/arrow/enter)
- [ ] ARIA roles cho nav / expandable section / tooltip
- [ ] (Optional) Keyboard shortcut (vd: `[` để collapse/expand)

---

## Notes
- [ ] Xác định scope “clone giống UI” vs “clone luôn behavior + data”
- [ ] Map checklist → Epics/Stories (FE/BE) theo sprint
