/* ==========================================================================
   PREMIUM PORTFOLIO INTERACTIVITY SCRIPT
   Includes: Theme Toggle, Mouse Spotlight, Mobile Menu, Active Scrollspy,
             Scroll Animation Observer, Dynamic CV Download, Form Validation
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // --- DOM Elements ---
    const body = document.body;
    const navbar = document.getElementById('navbar');
    const themeToggle = document.getElementById('themeToggle');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const ambientGlow = document.getElementById('ambientGlow');
    const downloadCVBtn = document.getElementById('downloadCVBtn');
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    
    // Language Switcher Elements
    const langSelector = document.getElementById('langSelector');
    const langBtn = document.getElementById('langBtn');
    const langDropdown = document.getElementById('langDropdown');
    const langOptions = document.querySelectorAll('#langDropdown .dropdown-item');

    // EmailJS Public Key Placeholder Initialization
    const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY"; // Replace with your EmailJS Public Key
    if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
        emailjs.init({
            publicKey: EMAILJS_PUBLIC_KEY,
        });
    }

    // --- Translation Dictionary ---
    const translations = {
        vi: {
            'nav-home': 'Trang Chủ',
            'nav-about': 'Giới Thiệu',
            'nav-education': 'Học Vấn',
            'nav-skills': 'Kỹ Năng',
            'nav-experience': 'Kinh Nghiệm',
            'nav-projects': 'Dự Án',
            'nav-contact': 'Liên Hệ',
            'nav-lang-label': 'Ngôn Ngữ',
            'hero-badge': 'Sinh viên năm cuối IT',
            'hero-title': 'Xin chào, tôi là<br><span class="text-gradient">Đinh Hoàng Cước</span>',
            'hero-subtitle': 'Sinh viên Phát triển Ứng dụng Di động',
            'hero-desc': 'Sinh viên năm cuối ngành Công nghệ thông tin tại Cao đẳng Công nghệ Thủ Đức. Tập trung học tập và thực hành phát triển ứng dụng di động trên nền tảng Android (Kotlin/Java) và Flutter.',
            'hero-stat-birth': 'Năm sinh',
            'hero-stat-projects': 'Dự án học tập',
            'hero-stat-hotline': 'Hotline',
            'btn-contact': 'Liên Hệ Ngay',
            'btn-download': 'Tải CV (TXT)',
            'hero-scroll': 'Cuộn xuống để xem tiếp',
            
            'about-subtitle': 'Profile',
            'about-title': 'Giới Thiệu Bản Thân',
            'about-info-header': 'Thông tin cá nhân',
            'about-info-name': 'Họ và Tên',
            'about-info-dob': 'Ngày sinh',
            'about-info-location': 'Địa chỉ',
            'about-info-location-val': 'Dĩ An, Bình Dương, Việt Nam',
            'about-info-email': 'Email',
            'about-info-phone': 'Điện thoại',
            'about-goal-short-title': 'Mục tiêu ngắn hạn',
            'about-goal-short-desc': 'Trở thành Mobile Application Developer, tiếp tục rèn luyện kỹ năng lập trình và tích lũy thêm nhiều kinh nghiệm thực tế thông qua các dự án phát triển phần mềm.',
            'about-goal-long-title': 'Mục tiêu dài hạn',
            'about-goal-long-desc': 'Tập trung phát triển các ứng dụng di động chất lượng cao, mang lại giá trị sử dụng cho người dùng cuối cùng và hỗ trợ các hoạt động vận hành của doanh nghiệp.',
            
            'edu-subtitle': 'Credentials',
            'edu-title': 'Học Vấn',
            'edu-inst-name': 'Cao đẳng Công nghệ Thủ Đức',
            'edu-major': 'Ngành: Công nghệ thông tin',
            'edu-spec': 'Chuyên ngành: Phát triển Ứng dụng Di động',
            'edu-desc': 'Đang hoàn thành chương trình học về thiết kế cấu trúc phần mềm di động, cơ sở dữ liệu quan hệ, và quy trình xây dựng ứng dụng di động native (Android) và multi-platform (Flutter).',
            'edu-highlight-1': 'Tiếp thu kỹ năng lập trình hướng đối tượng (OOP) và thiết kế cơ sở dữ liệu.',
            'edu-highlight-2': 'Thực hành xây dựng giao diện người dùng Responsive trên web và di động.',
            'edu-highlight-3': 'Có kinh nghiệm làm Trưởng nhóm (Leader) điều phối các đồ án môn học.',
            
            'skills-subtitle': 'Skills',
            'skills-title': 'Kỹ Năng Cá Nhân',
            'skill-cat-1': 'Mobile & Web Development',
            'skill-cat-2': 'Programming & Databases',
            'skill-cat-3': 'Digital & Office Skills',
            'skill-cat-4': 'General Computer Skills',
            'skill-tag-computer-1': 'Sử dụng máy tính nhanh nhạy',
            'skill-tag-computer-2': 'Gõ bàn phím tốt',
            'skill-tag-computer-3': 'Tìm kiếm thông tin & Tra cứu internet',
            'skill-tag-computer-4': 'Công cụ tăng hiệu suất với AI',
            'skill-tag-computer-7': 'Viết câu lệnh (Prompt) & Hỗ trợ quy trình làm việc',
            'skill-tag-computer-8': 'Quản lý tệp tin & Tài liệu',
            'skill-tag-computer-9': 'Tạo bài thuyết trình',
            'skill-tag-computer-10': 'Chỉnh sửa ảnh & Video cơ bản',
            'skill-cat-5': 'Soft Skills',
            'skill-tag-soft-1': 'Làm việc nhóm',
            'skill-tag-soft-2': 'Trưởng nhóm (Team Leadership)',
            'skill-tag-soft-3': 'Giao tiếp',
            'skill-tag-soft-4': 'Giải quyết vấn đề',
            'skill-tag-soft-5': 'Quản lý thời gian',
            'skill-tag-soft-6': 'Điều phối dự án',
            'skill-tag-soft-7': 'Tự học & Thích ứng nhanh',
            'skill-cat-6': 'Tools & Software',
            
            'exp-subtitle': 'Work History',
            'exp-title': 'Kinh Nghiệm Làm Việc',
            'exp-badge': 'Cửa hàng tạp hóa gia đình',
            'exp-role': 'Sales Assistant',
            'exp-company': 'Cửa hàng Kinh doanh Gia đình',
            'exp-desc': 'Thực hiện các công việc tư vấn khách hàng, sắp xếp hàng hóa và hỗ trợ bán hàng trực tiếp.',
            'exp-metric': 'Doanh thu đạt khoảng <strong>300 triệu VNĐ</strong> trong vòng 3 năm.',
            
            'proj-subtitle': 'Academic Projects',
            'proj-title': 'Dự Án Đồ Án Môn Học',
            'proj-role-leader': 'Leader',
            'proj-role-team-leader': 'Team Leader',
            'proj-role-member': 'Team Member',
            'proj-1-name': 'Hệ thống Quản lý Phim',
            'proj-1-desc': 'Hệ thống phân tích và quản lý thông tin rạp chiếu phim, lịch chiếu và quản lý đặt vé.',
            'proj-1-bullet-1': 'Thiết kế sơ đồ quan hệ thực thể (ERD) cho hệ thống.',
            'proj-1-bullet-2': 'Xây dựng cơ sở dữ liệu trên SQL Server.',
            'proj-1-bullet-3': 'Quản lý và điều phối nhóm gồm 4 thành viên.',
            
            'proj-2-name': 'Dự án Mạng Máy tính',
            'proj-2-desc': 'Thiết kế sơ đồ cấu trúc logic và cấu hình hệ thống kết nối mạng máy tính theo yêu cầu đồ án môn học (Thời gian: 07/2023 - 09/2023).',
            'proj-2-bullet-1': 'Điều phối công việc nhóm và đảm bảo tiến độ dự án.',
            'proj-2-bullet-2': 'Thiết kế sơ đồ cấu trúc logic (Network Topology) bằng Microsoft Visio.',
            'proj-2-bullet-3': 'Xây dựng và cấu hình hệ thống mạng trên phần mềm Cisco Packet Tracer.',
            'proj-2-bullet-4': 'Lập kế hoạch kết nối thiết bị và thiết lập cấu trúc mạng.',
            'proj-2-bullet-5': 'Kiểm thử chất lượng kết nối và xác minh hoạt động của hệ thống.',
            
            'proj-3-name': 'Website Google Sites',
            'proj-3-desc': 'Triển khai trang thông tin nhóm trên nền tảng Google Sites kết hợp lưu trữ tài liệu.',
            'proj-3-bullet-1': 'Xây dựng trang web thông tin nhóm trên Google Sites.',
            'proj-3-bullet-2': 'Phối hợp điều phối công việc nhóm với vai trò Leader.',
            
            'proj-4-name': 'App Quản lý Kho Android',
            'proj-4-desc': 'Ứng dụng hỗ trợ ghi chép dữ liệu xuất nhập và kiểm tra hàng tồn kho trên thiết bị Android.',
            'proj-4-bullet-1': 'Xây dựng các chức năng quản lý sản phẩm cơ bản (CRUD).',
            'proj-4-bullet-2': 'Lập trình chức năng tìm kiếm sản phẩm.',
            
            'proj-5-name': 'App Cửa hàng Quần áo (Mobile Dev 3)',
            'proj-5-desc': 'Ứng dụng mua sắm thời trang trực tuyến tích hợp cơ sở dữ liệu thời gian thực.',
            'proj-5-bullet-1': 'Phát triển các mô-đun: Thông tin tài khoản (Profile) và Sản phẩm yêu thích (Wishlist).',
            'proj-5-bullet-2': 'Tối ưu hóa hiển thị danh sách sản phẩm bằng RecyclerView.',
            'proj-5-bullet-3': 'Tích hợp dữ liệu Firebase và lưu trữ dữ liệu cục bộ qua SharedPreferences.',
            
            'proj-6-name': 'App Quản lý Công việc (Mobile Dev 2)',
            'proj-6-desc': 'Ứng dụng lập lịch và ghi chép công việc cá nhân hàng ngày với lưu trữ dữ liệu offline.',
            'proj-6-bullet-1': 'Thiết kế cấu trúc bảng cơ sở dữ liệu SQLite trong ứng dụng.',
            'proj-6-bullet-2': 'Lập trình các lớp hỗ trợ kết nối dữ liệu (SQLiteOpenHelper).',
            'proj-6-bullet-3': 'Xây dựng các chức năng CRUD và hiển thị danh mục công việc trên RecyclerView.',
            
            'proj-7-name': 'Ứng dụng Quản lý Học sinh (WinForms)',
            'proj-7-desc': 'Phần mềm quản lý hồ sơ học sinh, điểm số và lớp học chạy trên môi trường Windows Desktop.',
            'proj-7-bullet-1': 'Thiết kế giao diện quản lý học sinh trên môi trường Windows Forms.',
            'proj-7-bullet-2': 'Cấu hình kết nối dữ liệu từ C# tới cơ sở dữ liệu SQL Server qua ADO.NET.',
            
            'social-subtitle': 'Connections',
            'social-title': 'Liên Kết Mạng Xã Hội',
            'social-gh-action': 'Xem mã nguồn dự án',
            'social-fb-action': 'Kết nối với tôi',
            'social-tt-action': 'Theo dõi kênh cá nhân',
            
            'contact-subtitle': 'Get in touch',
            'contact-title': 'Thông Tin Liên Hệ',
            'contact-phone-label': 'Điện thoại',
            'contact-email-label': 'Email',
            'contact-address-label': 'Địa chỉ',
            'contact-address-val': 'Dĩ An, Bình Dương, Việt Nam',
            'contact-form-name': 'Họ và tên',
            'contact-form-email': 'Email liên hệ',
            'contact-form-subject': 'Tiêu đề',
            'contact-form-msg': 'Tin nhắn',
            'btn-submit': 'Gửi Lời Nhắn',
            
            'placeholder-name': 'Nguyễn Văn A',
            'placeholder-email': 'nguyenvana@gmail.com',
            'placeholder-subject': 'Hợp tác, công việc...',
            'placeholder-message': 'Lời nhắn của bạn...',
            
            'modal-success-title': 'Gửi thành công!',
            'modal-success-desc': 'Cảm ơn bạn đã liên hệ. Tôi sẽ phản hồi tin nhắn trong thời gian sớm nhất.',
            'modal-success-close': 'Đóng',
            
            'footer-brand-text': 'Kiến tạo ứng dụng di động thực tiễn cho người dùng và doanh nghiệp.',
            'footer-links-title': 'Điều hướng nhanh',
            'footer-copy': '&copy; 2026 Đinh Hoàng Cước. Mọi quyền được bảo lưu.',
            'footer-subtext': 'Thiết kế bởi Antigravity.',
            
            'form-submitting': 'Đang gửi...',
            'form-submit-success': 'Gửi thành công!',
            'form-validation-alert': 'Vui lòng điền đầy đủ thông tin liên hệ!',
            'btn-downloaded': 'Đã tải xong',
            'about-info-name-val': 'Đinh Hoàng Cước',
            'skill-tag-oop': 'OOP (Lập trình hướng đối tượng)',
            'cv-filename': 'CV_DinhHoangCuoc.txt',
            'cv-content': `===========================================================
HỒ SƠ NĂNG LỰC CÁ NHÂN (PORTFOLIO CV)
===========================================================

I. THÔNG TIN CÁ NHÂN
-----------------------------------------------------------
* Họ và tên: Đinh Hoàng Cước
* Ngày sinh: 01/01/2005
* Số điện thoại: 0937397516
* Email: cuoc2004@gmail.com
* Địa chỉ: Dĩ An, Bình Dương, Việt Nam
* GitHub: https://github.com/cuocvn
* Facebook: https://www.facebook.com/hoang.cuoc.308405
* TikTok: https://www.tiktok.com/@hc1512

II. MỤC TIÊU NGHỀ NGHIỆP
-----------------------------------------------------------
* Mục tiêu ngắn hạn:
  Trở thành Mobile Application Developer, cải thiện kỹ năng lập trình và tích lũy kinh nghiệm phát triển phần mềm thực tế.
  
* Mục tiêu dài hạn:
  Phát triển ứng dụng di động chất lượng cao, mang lại giá trị thiết thực cho người dùng và doanh nghiệp.

III. HỌC VẤN
-----------------------------------------------------------
* Trường: Cao đẳng Công nghệ Thủ Đức
* Thời gian học: 2023 - 2026
* Ngành: Công nghệ thông tin
* Chuyên ngành: Phát triển Ứng dụng Di động

IV. KỸ NĂNG CÁ NHÂN
-----------------------------------------------------------
* Mobile & Web Development: Android Development, Kotlin, Flutter, Firebase, RecyclerView, SharedPreferences, XML Layout, Fragments, HTML, CSS, JavaScript, Responsive Design
* Programming & Databases: C#, OOP, SQL Server, Database Design, ERD Design
* Digital & Office Skills: Microsoft Word, Microsoft Excel, Microsoft PowerPoint, Google Docs, Google Sheets, Google Slides, Canva, CapCut
* General Computer Skills: Fast and accurate computer usage, Good typing skills, Internet research and information gathering, AI-assisted productivity tools (ChatGPT, Google Gemini, AI prompt writing and workflow assistance), File and document management, Presentation creation, Basic image and video editing
* Soft Skills: Teamwork, Team Leadership, Communication, Problem Solving, Time Management, Project Coordination, Self-learning and Adaptability
* Tools & Software: Android Studio, Visual Studio, VS Code, SQL Server Management Studio (SSMS), GitHub, Firebase Console, Cisco Packet Tracer, Microsoft Visio, Draw.io (Diagrams.net), Canva, CapCut

V. KINH NGHIỆM LÀM VIỆC
-----------------------------------------------------------
* Cửa hàng tạp hóa gia đình (2020 - 2023)
  * Vai trò: Sales Assistant
  * Kết quả đạt được: Hỗ trợ khách hàng, thực hiện các công việc bán hàng, đạt doanh thu khoảng 300 triệu VNĐ trong vòng 3 năm.

VI. DỰ ÁN HỌC TẬP NỔI BẬT
-----------------------------------------------------------
1. Hệ thống Quản lý Phim (Vai trò: Leader)
   * Thiết kế sơ đồ quan hệ thực thể (ERD) cho hệ thống.
   * Xây dựng cơ sở dữ liệu trên SQL Server.
   * Quản lý và điều phối nhóm gồm 4 thành viên.

2. Dự án Mạng Máy tính (Vai trò: Team Leader | Thời gian: 07/2023 - 09/2023)
   * Công nghệ: Microsoft Visio, Cisco Packet Tracer
   * Điều phối và quản lý công việc của các thành viên trong nhóm.
   * Thiết kế sơ đồ cấu trúc logic (Network Topology) bằng Microsoft Visio.
   * Xây dựng và cấu hình hệ thống mạng trên phần mềm Cisco Packet Tracer.
   * Lập kế hoạch kết nối thiết bị và thiết lập cấu trúc mạng.
   * Kiểm thử chất lượng kết nối và xác minh hoạt động của hệ thống.
   * Đảm bảo hoàn thành dự án đúng yêu cầu và tiến độ.

3. Website Google Sites (Vai trò: Leader)
   * Xây dựng trang web thông tin nhóm trên Google Sites.
   * Phối hợp điều phối công việc nhóm với vai trò Leader.

4. App Quản lý Kho Android (Vai trò: Team Member)
   * Xây dựng các chức năng quản lý sản phẩm cơ bản (CRUD).
   * Lập trình chức năng tìm kiếm sản phẩm.

5. App Cửa hàng Quần áo - Mobile Dev 3 (Vai trò: Team Member)
   * Phát triển các mô-đun: Thông tin tài khoản (Profile) và Sản phẩm yêu thích (Wishlist).
   * Tối ưu hóa hiển thị danh sách sản phẩm bằng RecyclerView.
   * Tích hợp dữ liệu Firebase và lưu trữ dữ liệu cục bộ qua SharedPreferences.

6. App Quản lý Công việc - Mobile Dev 2 (Vai trò: Team Member)
   * Thiết kế cấu trúc bảng cơ sở dữ liệu SQLite trong ứng dụng.
   * Lập trình các lớp hỗ trợ kết nối dữ liệu (SQLiteOpenHelper).
   * Xây dựng chức năng CRUD công việc và hiển thị với RecyclerView.

7. Ứng dụng Quản lý Học sinh - WinForms (Vai trò: Team Member)
   * Thiết kế giao diện quản lý học sinh trên môi trường Windows Forms.
   * Cấu hình kết nối dữ liệu từ C# tới SQL Server qua ADO.NET.

===========================================================
Đinh Hoàng Cước - 2026
===========================================================`
        },
        en: {
            'nav-home': 'Home',
            'nav-about': 'About',
            'nav-education': 'Education',
            'nav-skills': 'Skills',
            'nav-experience': 'Experience',
            'nav-projects': 'Projects',
            'nav-contact': 'Contact',
            'nav-lang-label': 'Language',
            'hero-badge': 'Final-Year IT Student',
            'hero-title': 'Hello, I am<br><span class="text-gradient">Đinh Hoàng Cước</span>',
            'hero-subtitle': 'Mobile Application Development Student',
            'hero-desc': 'Final-year Information Technology student at Thu Duc College of Technology. Focused on studying and practicing mobile application development on Android (Kotlin/Java) and Flutter.',
            'hero-stat-birth': 'Birth Year',
            'hero-stat-projects': 'Projects',
            'hero-stat-hotline': 'Hotline',
            'btn-contact': 'Contact Now',
            'btn-download': 'Download CV (TXT)',
            'hero-scroll': 'Scroll down to explore',
            
            'about-subtitle': 'Profile',
            'about-title': 'About Me',
            'about-info-header': 'Personal Info',
            'about-info-name': 'Full Name',
            'about-info-dob': 'Date of Birth',
            'about-info-location': 'Location',
            'about-info-location-val': 'Di An, Binh Duong, Vietnam',
            'about-info-email': 'Email',
            'about-info-phone': 'Phone',
            'about-goal-short-title': 'Short-term Goal',
            'about-goal-short-desc': 'Become a Mobile Application Developer, improve programming skills and gain real-world software development experience.',
            'about-goal-long-title': 'Long-term Goal',
            'about-goal-long-desc': 'Develop high-quality mobile applications that provide value to users and businesses.',
            
            'edu-subtitle': 'Credentials',
            'edu-title': 'Education',
            'edu-inst-name': 'Thu Duc College of Technology',
            'edu-major': 'Major: Information Technology',
            'edu-spec': 'Specialization: Mobile Application Development',
            'edu-desc': 'Completing the academic program in mobile software architecture, relational databases, and hands-on native Android and multi-platform Flutter development.',
            'edu-highlight-1': 'Acquire object-oriented programming (OOP) and database design skills.',
            'edu-highlight-2': 'Practice building responsive user interfaces for web and mobile.',
            'edu-highlight-3': 'Gain experience as a Team Leader coordinating course projects.',
            
            'skills-subtitle': 'Skills',
            'skills-title': 'Personal Skills',
            'skill-cat-1': 'Mobile & Web Development',
            'skill-cat-2': 'Programming & Databases',
            'skill-cat-3': 'Digital & Office Skills',
            'skill-cat-4': 'General Computer Skills',
            'skill-tag-computer-1': 'Fast and accurate computer usage',
            'skill-tag-computer-2': 'Good typing skills',
            'skill-tag-computer-3': 'Internet research and information gathering',
            'skill-tag-computer-4': 'AI-assisted productivity tools',
            'skill-tag-computer-7': 'AI prompt writing & workflow assistance',
            'skill-tag-computer-8': 'File and document management',
            'skill-tag-computer-9': 'Presentation creation',
            'skill-tag-computer-10': 'Basic image and video editing',
            'skill-cat-5': 'Soft Skills',
            'skill-tag-soft-1': 'Teamwork',
            'skill-tag-soft-2': 'Team Leadership',
            'skill-tag-soft-3': 'Communication',
            'skill-tag-soft-4': 'Problem Solving',
            'skill-tag-soft-5': 'Time Management',
            'skill-tag-soft-6': 'Project Coordination',
            'skill-tag-soft-7': 'Self-learning & Adaptability',
            'skill-cat-6': 'Tools & Software',
            
            'exp-subtitle': 'Work History',
            'exp-title': 'Work Experience',
            'exp-badge': 'Family grocery store',
            'exp-role': 'Sales Assistant',
            'exp-company': 'Family Business',
            'exp-desc': 'Performed customer support, handled sales activities, and managed inventory.',
            'exp-metric': 'Revenue approximately <strong>300 million VND</strong> over 3 years.',
            
            'proj-subtitle': 'Academic Projects',
            'proj-title': 'Academic Projects',
            'proj-role-leader': 'Leader',
            'proj-role-team-leader': 'Team Leader',
            'proj-role-member': 'Team Member',
            'proj-1-name': 'Movie Management System',
            'proj-1-desc': 'System analyzing and managing cinema information, schedules, and ticket reservations.',
            'proj-1-bullet-1': 'Designed Entity-Relationship Diagram (ERD).',
            'proj-1-bullet-2': 'Developed SQL Server database.',
            'proj-1-bullet-3': 'Managed a team of 4 members.',
            
            'proj-2-name': 'Computer Network Project',
            'proj-2-desc': 'Designed network topology logic and simulated network connections for a course project (Duration: 07/2023 - 09/2023).',
            'proj-2-bullet-1': 'Led and coordinated team members throughout the project.',
            'proj-2-bullet-2': 'Designed network topology diagrams using Microsoft Visio.',
            'proj-2-bullet-3': 'Built and configured the network system using Cisco Packet Tracer.',
            'proj-2-bullet-4': 'Planned device connections and network structure.',
            'proj-2-bullet-5': 'Tested network connectivity and verified system functionality.',
            
            'proj-3-name': 'Google Sites Website',
            'proj-3-desc': 'Deployed a group information page on Google Sites integrated with document storage.',
            'proj-3-bullet-1': 'Built the group information website on Google Sites.',
            'proj-3-bullet-2': 'Coordinated group work as Team Leader.',
            
            'proj-4-name': 'Android Inventory Management Application',
            'proj-4-desc': 'Android application supporting product inbound/outbound records and real-time inventory checks.',
            'proj-4-bullet-1': 'Implemented basic product management features (CRUD).',
            'proj-4-bullet-2': 'Programmed product search features.',
            
            'proj-5-name': 'Clothing Store App (Mobile Dev 3)',
            'proj-5-desc': 'Online fashion e-commerce shopping application integrated with real-time database.',
            'proj-5-bullet-1': 'Developed User Profile and Wishlist modules.',
            'proj-5-bullet-2': 'Optimized list views using RecyclerView.',
            'proj-5-bullet-3': 'Integrated Firebase and saved local data with SharedPreferences.',
            
            'proj-6-name': 'Task & Memo Manager App (Mobile Dev 2)',
            'proj-6-desc': 'Personal task scheduling and note-taking application with local offline storage.',
            'proj-6-bullet-1': 'Designed SQLite database table schemas.',
            'proj-6-bullet-2': 'Coded database connection helpers (SQLiteOpenHelper).',
            'proj-6-bullet-3': 'Built CRUD functionality and displayed tasks on RecyclerView.',
            
            'proj-7-name': 'Student Record Manager (WinForms)',
            'proj-7-desc': 'Desktop software managing student records, grades, and classes on Windows.',
            'proj-7-bullet-1': 'Designed student management interfaces on Windows Forms.',
            'proj-7-bullet-2': 'Configured database connections from C# to SQL Server using ADO.NET.',
            
            'social-subtitle': 'Connections',
            'social-title': 'Social Links',
            'social-gh-action': 'View project source code',
            'social-fb-action': 'Connect with me',
            'social-tt-action': 'Follow personal channel',
            
            'contact-subtitle': 'Get in touch',
            'contact-title': 'Contact Information',
            'contact-phone-label': 'Phone',
            'contact-email-label': 'Email',
            'contact-address-label': 'Location',
            'contact-address-val': 'Di An, Binh Duong, Vietnam',
            'contact-form-name': 'Full Name',
            'contact-form-email': 'Contact Email',
            'contact-form-subject': 'Subject',
            'contact-form-msg': 'Message',
            'btn-submit': 'Send Message',
            
            'placeholder-name': 'John Doe',
            'placeholder-email': 'johndoe@gmail.com',
            'placeholder-subject': 'Collaboration, hiring...',
            'placeholder-message': 'Your message here...',
            
            'modal-success-title': 'Submitted Successfully!',
            'modal-success-desc': 'Thank you for reaching out. I will get back to you as soon as possible.',
            'modal-success-close': 'Close',
            
            'footer-brand-text': 'Creating practical mobile applications for users and businesses.',
            'footer-links-title': 'Quick Links',
            'footer-copy': '&copy; 2026 Dinh Hoang Cuoc. All rights reserved.',
            'footer-subtext': 'Designed by Antigravity.',
            
            'form-submitting': 'Sending...',
            'form-submit-success': 'Sent!',
            'form-validation-alert': 'Please fill in all contact information!',
            'btn-downloaded': 'Downloaded',
            'about-info-name-val': 'Dinh Hoang Cuoc',
            'skill-tag-oop': 'OOP (Object-Oriented Programming)',
            'cv-filename': 'CV_DinhHoangCuoc_EN.txt',
            'cv-content': `===========================================================
PERSONAL PORTFOLIO CV
===========================================================

I. PERSONAL INFORMATION
-----------------------------------------------------------
* Full name: Dinh Hoang Cuoc
* Date of birth: 01/01/2005
* Phone number: 0937397516
* Email: cuoc2004@gmail.com
* Address: Di An, Binh Duong, Vietnam
* GitHub: https://github.com/cuocvn
* Facebook: https://www.facebook.com/hoang.cuoc.308405
* TikTok: https://www.tiktok.com/@hc1512

II. CAREER OBJECTIVES
-----------------------------------------------------------
* Short-term goal:
  Become a Mobile Application Developer, improve programming skills and gain real-world software development experience.
  
* Long-term goal:
  Develop high-quality mobile applications that provide value to users and businesses.

III. EDUCATION
-----------------------------------------------------------
* Institution: Thu Duc College of Technology
* Duration: 2023 - 2026
* Major: Information Technology
* Specialization: Mobile Application Development

IV. PERSONAL SKILLS
-----------------------------------------------------------
* Mobile & Web Development: Android Development, Kotlin, Flutter, Firebase, RecyclerView, SharedPreferences, XML Layout, Fragments, HTML, CSS, JavaScript, Responsive Design
* Programming & Databases: C#, OOP, SQL Server, Database Design, ERD Design
* Digital & Office Skills: Microsoft Word, Microsoft Excel, Microsoft PowerPoint, Google Docs, Google Sheets, Google Slides, Canva, CapCut
* General Computer Skills: Fast and accurate computer usage, Good typing skills, Internet research and information gathering, AI-assisted productivity tools (ChatGPT, Google Gemini, AI prompt writing and workflow assistance), File and document management, Presentation creation, Basic image and video editing
* Soft Skills: Teamwork, Team Leadership, Communication, Problem Solving, Time Management, Project Coordination, Self-learning and Adaptability
* Tools & Software: Android Studio, Visual Studio, VS Code, SQL Server Management Studio (SSMS), GitHub, Firebase Console, Cisco Packet Tracer, Microsoft Visio, Draw.io (Diagrams.net), Canva, CapCut

V. WORK HISTORY
-----------------------------------------------------------
* Family grocery store (2020 - 2023)
  * Role: Sales Assistant
  * Achievements: Handled customer support, sales activities, and achieved approximately 300 million VND revenue over 3 years.

VI. OUTSTANDING ACADEMIC PROJECTS
-----------------------------------------------------------
1. Movie Management System (Role: Leader)
   * Analyzed system requirements.
   * Designed Entity-Relationship Diagram (ERD).
   * Developed SQL Server database, completed ~80% of SQL queries.
   * Managed a team of 4 members.

2. Computer Network Project (Role: Team Leader | Duration: 07/2023 - 09/2023)
   * Technologies: Microsoft Visio, Cisco Packet Tracer
   * Led and coordinated team members throughout the project.
   * Designed network topology diagrams using Microsoft Visio.
   * Built and configured the network system using Cisco Packet Tracer.
   * Planned device connections and network structure.
   * Tested network connectivity and verified system functionality.
   * Ensured project completion according to requirements and schedule.

3. Google Sites Website (Role: Leader)
   * Designed website layout.
   * Planned content structures and linked documents.
   * Managed the team and delivered the project on schedule.

4. Android Inventory Management Application (Role: Team Member)
   * Implemented core product management features (CRUD).
   * Programmed product search by name and barcode.
   * Assisted in testing and debugging UI errors.

5. Clothing Store App - Mobile Dev 3 (Role: Team Member)
   * Developed modules: Profile, Wishlist, Settings, Payment.
   * Optimized large list views using RecyclerView.
   * Integrated Firebase and saved local data with SharedPreferences.

6. Task & Memo Manager App - Mobile Dev 2 (Role: Team Member)
   * Designed SQLite database table schemas.
   * Coded database connection helpers (SQLiteOpenHelper).
   * Built CRUD functionality and displayed tasks on RecyclerView.

7. Student Record Manager - WinForms (Role: Team Member)
   * Designed data forms, login screens, and basic stats displays.
   * Configured database connections from C# to SQL Server using ADO.NET.
   * Coded input validation checks and button click event handlers.

===========================================================
Dinh Hoang Cuoc - 2026
===========================================================`
        }
    };

    // --- Language Translation Engine ---
    function setLanguage(lang) {
        const t = translations[lang];
        if (!t) return;
        
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (t[key]) {
                if (key === 'hero-title' || key === 'exp-metric') {
                    el.innerHTML = t[key];
                } else {
                    el.textContent = t[key];
                }
            }
        });

        const formName = document.getElementById('formName');
        const formEmail = document.getElementById('formEmail');
        const formSubject = document.getElementById('formSubject');
        const formMessage = document.getElementById('formMessage');

        if (formName) formName.placeholder = t['placeholder-name'];
        if (formEmail) formEmail.placeholder = t['placeholder-email'];
        if (formSubject) formSubject.placeholder = t['placeholder-subject'];
        if (formMessage) formMessage.placeholder = t['placeholder-message'];

        localStorage.setItem('language', lang);

        langOptions.forEach(opt => {
            if (opt.getAttribute('data-lang') === lang) {
                opt.classList.add('active');
            } else {
                opt.classList.remove('active');
            }
        });
    }

    // Toggle Dropdown Menu
    if (langBtn) {
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langSelector.classList.toggle('open');
        });
    }

    document.addEventListener('click', () => {
        if (langSelector) langSelector.classList.remove('open');
    });

    langOptions.forEach(opt => {
        opt.addEventListener('click', (e) => {
            const lang = opt.getAttribute('data-lang');
            setLanguage(lang);
            if (langSelector) langSelector.classList.remove('open');
        });
    });

    const initialLang = localStorage.getItem('language') || 'vi';
    setLanguage(initialLang);
    
    // --- 1. Premium Ambient Mouse Spotlight Glow ---
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    // Follow mouse coordinates
    document.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
    });

    // Handle touch move for mobile spotlight feel
    document.addEventListener('touchmove', (e) => {
        if (e.touches && e.touches[0]) {
            targetX = e.touches[0].clientX;
            targetY = e.touches[0].clientY;
        }
    });

    // High performance smooth animation loop (Lerp)
    function animateSpotlight() {
        currentX += (targetX - currentX) * 0.08;
        currentY += (targetY - currentY) * 0.08;
        
        const isLight = body.classList.contains('light-theme');
        const glowColor = isLight ? 'rgba(37, 99, 235, 0.05)' : 'rgba(139, 92, 246, 0.12)';
        
        if (ambientGlow) {
            ambientGlow.style.background = `radial-gradient(circle 500px at ${currentX}px ${currentY}px, ${glowColor} 0%, transparent 80%)`;
        }
        requestAnimationFrame(animateSpotlight);
    }
    animateSpotlight();

    // --- 2. Dark / Light Theme Toggle System ---
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
        body.classList.add('light-theme');
    } else {
        body.classList.remove('light-theme');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        const currentMode = body.classList.contains('light-theme') ? 'light' : 'dark';
        localStorage.setItem('theme', currentMode);
        
        themeToggle.style.transform = 'scale(0.9) rotate(30deg)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 150);
    });

    // --- 3. Sticky Navbar & Scrollspy Active States ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        let currentSectionId = '';
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 120; // offset navbar height

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < (sectionTop + sectionHeight)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });

    // --- 4. Mobile Menu Drawer Navigation ---
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navMenu.classList.toggle('open');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('open');
        });
    });

    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target) && navMenu.classList.contains('open')) {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('open');
        }
    });

    // --- 5. Scroll Animations (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // --- 6. Realistic CV File Generator & Download ---
    downloadCVBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        const currentLang = localStorage.getItem('language') || 'vi';
        const t = translations[currentLang];
        const cvContent = t['cv-content'];
        const fileName = t['cv-filename'] || 'CV_DinhHoangCuoc.txt';
        
        const blob = new Blob([cvContent], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        
        document.body.appendChild(link);
        link.click();
        
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        const originalText = downloadCVBtn.innerHTML;
        downloadCVBtn.innerHTML = `${t['btn-downloaded']} <i data-lucide="check"></i>`;
        downloadCVBtn.style.background = 'var(--accent-green)';
        if (typeof lucide !== 'undefined') lucide.createIcons();

        setTimeout(() => {
            downloadCVBtn.innerHTML = originalText;
            downloadCVBtn.style.background = '';
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }, 2000);
    });

    // --- 7. Contact Form Handler with Validation ---
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameVal = document.getElementById('formName').value.trim();
        const emailVal = document.getElementById('formEmail').value.trim();
        const subjectVal = document.getElementById('formSubject').value.trim();
        const messageVal = document.getElementById('formMessage').value.trim();

        const currentLang = localStorage.getItem('language') || 'vi';
        const t = translations[currentLang];

        if (!nameVal || !emailVal || !subjectVal || !messageVal) {
            alert(t['form-validation-alert']);
            return;
        }

        const submitBtn = document.getElementById('formSubmitBtn');
        const originalBtnContent = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `${t['form-submitting']} <i data-lucide="loader" class="animate-spin"></i>`;
        if (typeof lucide !== 'undefined') lucide.createIcons();

        function showSuccess() {
            successModal.classList.add('active');
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnContent;
            if (typeof lucide !== 'undefined') lucide.createIcons();
            contactForm.reset();
        }

        function resetSubmitBtn() {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnContent;
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }

        // EmailJS Credentials Placeholders
        const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID"; // Replace with your EmailJS Service ID
        const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID"; // Replace with your EmailJS Template ID

        if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY' && EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID' && EMAILJS_TEMPLATE_ID !== 'YOUR_TEMPLATE_ID') {
            const templateParams = {
                from_name: nameVal,
                reply_to: emailVal,
                subject: subjectVal,
                message: messageVal,
                to_email: 'cuoc2004@gmail.com'
            };

            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
                .then(() => {
                    showSuccess();
                })
                .catch((error) => {
                    console.error('EmailJS Error:', error);
                    alert(currentLang === 'vi' ? 'Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau!' : 'Failed to send message. Please try again later!');
                    resetSubmitBtn();
                });
        } else {
            // Fallback mock submission when EmailJS is not configured
            setTimeout(() => {
                showSuccess();
            }, 1200);
        }
    });

    modalCloseBtn.addEventListener('click', () => {
        successModal.classList.remove('active');
    });

    successModal.addEventListener('click', (e) => {
        if (e.target === successModal) {
            successModal.classList.remove('active');
        }
    });
});
