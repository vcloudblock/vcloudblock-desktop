const crypto = require('crypto');
const fs = require('fs');
 
// 计算文件的SHA256校验和
function calculateFileChecksum(filePath, algorithm = 'sha256', encoding = 'hex') {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash(algorithm);
    const inputStream = fs.createReadStream(filePath);
 
    inputStream.on('error', reject);
    hash.on('finish', () => resolve(hash.digest(encoding)));
 
    inputStream.pipe(hash);
  });
}
 
// 使用示例
const filePath = 'C:/VCloudBlockExternalResources/external-resources-v0.4.0.zip'; // 替换为你的文件路径
calculateFileChecksum(filePath)
  .then(checksum => console.log(`SHA256: ${checksum}`))
  .catch(error => console.error('Error calculating checksum:', error));