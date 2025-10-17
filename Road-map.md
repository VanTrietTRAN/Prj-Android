
## Roadmap dự án Wallet — 5 tuần

> Mục tiêu tổng quan: Xây dựng MVP của ứng dụng ví điện tử gồm backend (API + DB) và frontend (React Native) — hoàn thiện và sẵn sàng demo trong 5 tuần.

---

### 🎯 Tuần 1 — Nền tảng & Lên kế hoạch

Mục tiêu chính: Xác định MVP, chuẩn bị hạ tầng và thống nhất quy trình.

- Thời lượng: 1 tuần
- Deliverables: Thiết kế CSDL, project skeleton (backend + frontend), tài liệu API sơ bộ, quy ước làm việc

Nhiệm vụ chính:
- Backend
	- Thiết kế cơ sở dữ liệu (ER diagram, bảng chính)
	- Khởi tạo project Express và kết nối DB
	- Viết các API cơ bản: đăng ký, đăng nhập
- Frontend
	- Khởi tạo project React Native
	- Dựng cấu trúc thư mục, đặt quy ước component
	- Xây dựng UI cơ bản: nút, input, card
	- Thiết lập navigation cơ bản
- Cả nhóm
	- Thống nhất workflow (git branching, code style)
	- Chuẩn hoá tài liệu API ban đầu

Owners (gợi ý): Backend: A, Frontend: B, All: C

---

### 🎯 Tuần 2–3 — Phát triển tính năng cốt lõi

Mục tiêu chính: Hoàn thành chức năng MVP (2 tuần)

- Thời lượng: 2 tuần
- Deliverables: Bộ API hoàn chỉnh cho MVP, các màn hình chính trên app, tích hợp cơ bản

Nhiệm vụ chính:
- Backend
	- Hoàn thiện API cho các tính năng MVP
	- Viết tài liệu API chi tiết (endpoints, request/response, lỗi)
- Frontend
	- Dựng giao diện cho màn hình chính (home, wallet, chuyển tiền, lịch sử)
	- Tích hợp API từ backend
	- Quản lý trạng thái người dùng (auth token, profile lưu offline)
- Giao tiếp
	- Sync liên tục giữa FE và BE, review API contract

Checkpoints (cuối tuần 2 và cuối tuần 3): QA nội bộ, demo ngắn

---

### 🎯 Tuần 4 — Tích hợp, Kiểm thử & Tinh chỉnh

Mục tiêu chính: Ghép nối các module, test chéo, sửa lỗi

- Thời lượng: 1 tuần
- Deliverables: Danh sách bug đã fix, trải nghiệm mượt hơn, checklist QA

Nhiệm vụ chính:
- Kiểm thử chéo: FE test API, BE hỗ trợ logs và sửa lỗi
- Tổ chức buổi test nội bộ (4 thành viên)
- Ghi nhận lỗi (Trello) và ưu tiên sửa lỗi nghiêm trọng
- Tinh chỉnh UI/UX và luồng người dùng

---

### 🎯 Tuần 5 — Hoàn thiện & Đóng gói

Mục tiêu chính: Chuẩn bị release demo, build APK

- Thời lượng: 1 tuần
- Deliverables: APK testable, tài liệu hướng dẫn, checklist demo

Nhiệm vụ chính:
- Sửa lỗi còn lại và tối ưu hiệu năng
- Viết tài liệu hướng dẫn sử dụng (nếu cần)
- Build file APK cho Android
- Chuẩn bị slide/demo trình bày
- Tổng kết và ăn mừng 🎉

---