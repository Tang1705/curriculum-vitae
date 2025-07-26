// 数据加载函数
async function loadData(file) {
    try {
        const response = await fetch(`v2/data/${file}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error loading ${file}:`, error);
        return null;
    }
}

// 渲染个人信息
function renderPersonalInfo(data) {
    if (!data) return;

    const container = document.getElementById('personal-info');
    container.innerHTML = `
                <h1>${data.name}</h1>
                <div class="contact-info">
                    ${data.contact.map(item => `
                        <a href="${item.link}" class="contact-item"><i class="${item.icon}"></i> ${item.text}</a>
                    `).join('')}
                </div>
            `;
    container.style.display = 'block';
}

// 渲染教育背景
function renderEducation(data) {
    if (!data) return;

    const container = document.getElementById('education-content');
    container.innerHTML = data.map(edu => `
                <div class="education-item">
                    <div class="left-content">
                        <h3>${edu.major}</h3>
                        <p>${edu.degree}. ${edu.description}</p>
                    </div>
                    <div class="right-content">
                        <p class="university" ${edu.institution === 'Nanjing University' ? 'style="color: #4d0099"' : ''}>
                            ${edu.institution}
                        </p>
                        <p class="duration">${edu.period}</p>
                    </div>
                </div>
            `).join('');
    container.parentElement.style.display = 'block';
}


// 渲染论文
function renderPublications(data) {
    if (!data) return;

    const container = document.getElementById('publications-content');
    container.innerHTML = data.map(pub => {
        // 处理标题（居左第一行）
        const title = `<div class="pub-title">${pub.title} ${pub.url ? `<a href="${pub.url}" style="color:rgba(220, 53, 34, 1)"><i class="fas fa-file-pdf" ></i></a>` : ''}</div>`;

        // 处理作者（居左第二行）
        const authors = pub.authors.map(author =>
            author.isFirstAuthor
                ? `<span class="first-author">${author.name}</span>`
                : author.name
        ).join(', ');
        const authorLine = `<div class="pub-authors">${authors}</div>`;

        // 处理右侧内容：类别（第一行） + 会议/年份（第二行）
        const categoryStyle = pub.category.toLowerCase(); // 用于 CSS 类名
        const venueYear = `<div class="pub-venue-year">${pub.venue} ${pub.year}</div>`;
        const categoryLine = `<div class="pub-category ${categoryStyle}">${pub.category}</div>`;

        // 拼接最终结构：左侧标题+作者，右侧类别+会议年份
        return `
      <div class="publication">
        <!-- 左侧内容：标题 + 作者 -->
        <div class="pub-left">
          ${title}
          ${authorLine}
        </div>
        <!-- 右侧内容：类别 + 会议/年份 -->
        <div class="pub-right">
          ${categoryLine}
          ${venueYear}
        </div>
      </div>
    `;
    }).join('');

    container.parentElement.style.display = 'block';
}

// 渲染项目经验
function renderExperiences(data) {
    if (!data) return;

    const container = document.getElementById('experiences-content');
    container.innerHTML = data.map(exp => `
        <div class="experience-item">
            <!-- 上部分：分为左右两栏 -->
            <div class="upper-section">
                <!-- 左侧：项目名称和组织机构 -->
                <div class="upper-left">
                    <div class="project-title">${exp.title}</div>
                    <p class="institution">${exp.organization}</p>
                </div>
                <!-- 右侧：基金和描述 -->
                <div class="upper-right">
                    <p class="project-type">${exp.fund}</p>
                    <p class="participant-role">${exp.description}</p>
                </div>
            </div>
            <!-- 下部分：分点展示的项目要点 -->
            <div class="lower-section">
                <ul class="project-details">
                    ${exp.points.map(point => `<li>${point}</li>`).join('')}
                </ul>
            </div>
        </div>
    `).join('');

    container.parentElement.style.display = 'block';
}


// 渲染奖项
function renderAwards(data) {
    if (!data) return;

    const container = document.getElementById('awards-content');
    container.innerHTML = data.map(award => `
                <div class="award-item">
                <div class="award-left">${award.title}</div>
                <div class="award-right">${award.year}</div>
                </div>
            `).join('');

    container.parentElement.style.display = 'block';
}

// 渲染技能
function renderSkills(data) {
    if (!data) return;

    const container = document.getElementById('skills-content');
    container.innerHTML = `
                <div class="skills-container">
                    ${data.map(category => `
                        <div class="skill-item">
                            <div class="skill-title">${category.name}</div>
                            <div class="skill-content">${category.skills}</div>
                          </div>
                    `).join('')}
                </div>
            `;

    container.parentElement.style.display = 'block';
}

// 渲染页脚
function renderFooter() {
    const footer = document.getElementById('footer');
    footer.innerHTML = `Last updated: July 2025 | Q. Tang's Curriculum Vitae`;
    footer.style.display = 'block';
}

// 初始化函数
async function init() {
    // 加载所有数据
    const personalData = await loadData('personal.json');
    const educationData = await loadData('education.json');
    const publicationsData = await loadData('publications.json');
    const experiencesData = await loadData('experiences.json');
    const awardsData = await loadData('awards.json');
    const skillsData = await loadData('skills.json');

    // 隐藏加载状态
    document.getElementById('loading').style.display = 'none';

    // 渲染所有内容
    renderPersonalInfo(personalData);
    renderEducation(educationData);
    renderPublications(publicationsData);
    renderExperiences(experiencesData);
    renderAwards(awardsData);
    renderSkills(skillsData);
    renderFooter();
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);

