const fs = require('fs');
const path = require('path');

// 각 지역 SVG 파일에서 path의 전체 d 속성 추출
const regionCodes = [
  'KR11', 'KR26', 'KR27', 'KR28', 'KR29', 'KR30', 'KR31',
  'KR41', 'KR42', 'KR43', 'KR44', 'KR45', 'KR46', 'KR47', 'KR48', 'KR49', 'KR50'
];

const regionPaths = {};

// 각 개별 SVG 파일에서 path의 전체 d 속성 추출
regionCodes.forEach(code => {
  const svgPath = path.join(__dirname, '../public/maps', `${code}.svg`);
  const content = fs.readFileSync(svgPath, 'utf-8');
  const match = content.match(/d="([^"]+)"/);
  if (match) {
    regionPaths[code] = match[1];
  }
});

// map.svg 파일 읽기
const mapSvgPath = path.join(__dirname, '../public/maps/map.svg');
let mapContent = fs.readFileSync(mapSvgPath, 'utf-8');

let matchCount = 0;

// 각 path에 id 추가
regionCodes.forEach(code => {
  const dAttr = regionPaths[code];
  if (dAttr) {
    // 정확한 d 속성을 찾아서 id 추가
    const oldPath = `<path d="${dAttr}"`;
    const newPath = `<path id="${code}" data-region="${code}" d="${dAttr}"`;

    if (mapContent.includes(oldPath)) {
      mapContent = mapContent.replace(oldPath, newPath);
      matchCount++;
      console.log(`✅ ${code} 매칭 완료`);
    } else {
      console.log(`❌ ${code} 매칭 실패`);
    }
  }
});

// 수정된 내용 저장
fs.writeFileSync(mapSvgPath, mapContent, 'utf-8');

console.log(`\n완료! ${matchCount}/${regionCodes.length}개 지역 ID가 추가되었습니다.`);
