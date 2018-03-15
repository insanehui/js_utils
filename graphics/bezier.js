/*
 * 计算平滑曲线的算法
 */
import _ from 'lodash'
import {autobind} from 'core-decorators'
import {zip, converge, drop, dropLast, compose, map} from 'ramda'

const distance = ([a, b])=>Math.sqrt(( a.x-b.x )**2 + (a.y-b.y)**2) // 求两点距离
const distances = compose(
  map(distance),
  converge(zip, [drop(1), dropLast(1)]), 
)

function Thomas4(r,a,b,c,d) {
  var p,n,m
  n = r.length
  p = new Array(n)

  // the following array elements are not in the original matrix, so they should not have an effect
  a[0]=0; // outside the matrix
  c[n-1]=0; // outside the matrix
  d[n-2]=0; // outside the matrix
  d[n-1]=0; // outside the matrix

  /*solves Ax=b with the Thomas algorithm (from Wikipedia)*/
  /* adapted for a 4-diagonal matrix. only the a[i] are under the diagonal, so the Gaussian elimination is very similar */
  for (let i = 1; i < n; i++) {
    m = a[i]/b[i-1];
    b[i] = b[i] - m * c[i - 1];
    c[i] = c[i] - m * d[i - 1];
    r[i] = r[i] - m * r[i-1];
  }
 
  p[n-1] = r[n-1]/b[n-1];
  p[n-2] = (r[n-2] - c[n-2] * p[n-1]) / b[n-2];
  for (let i = n - 3; i >= 0; --i) {  
    p[i] = (r[i] - c[i] * p[i+1]-d[i]*p[i+2]) / b[i];
  } 
  return p
}

export function computeControlPointsBigWThomas(K,W) {
  /*
   * 第一个参数为knot的坐标（某一轴上，比如x轴），第二个参数为knot间的距离
   * 因此K.length = W.length + 1
   */
  var p, p1, p2
  p = [];

  p1=[];
  p2=[];
  const n = K.length-1;
  
  /*rhs vector*/
  const a=[];
  const b=[];
  const c=[];
  const d=[];
  const r=[];
  
  /*left most segment*/
  a[0]=0; // outside the matrix
  b[0]=2;
  c[0]=-1;
  d[0]=0
  r[0] = K[0]+0;// add curvature at K0
  
  /*internal segments*/
  for (let i = 1; i < n ; i++) {
    a[2*i-1]=1*W[i]*W[i];
    b[2*i-1]=-2*W[i]*W[i];
    c[2*i-1]=2*W[i-1]*W[i-1];
    d[2*i-1]=-1*W[i-1]*W[i-1]
    r[2*i-1] = K[i]*((-W[i]*W[i]+W[i-1]*W[i-1]))//

    a[2*i]=W[i];
    b[2*i]=W[i-1];
    c[2*i]=0;
    d[2*i]=0; // note: d[2n-2] is already outside the matrix
    r[2*i] = (W[i-1]+W[i])*K[i];
  }
      
  /*right segment*/
  a[2*n-1]=-1;
  b[2*n-1]=2;
  r[2*n-1]=K[n];// curvature at last point

  // the following array elements are not in the original matrix, so they should not be used:
  c[2*n-1]=0; // outside the matrix
  d[2*n-2]=0; // outside the matrix
  d[2*n-1]=0; // outside the matrix

  /*solves Ax=b with the Thomas algorithm (from Wikipedia)*/
  p = Thomas4(r,a,b,c,d)

  // 将控制点分到两个数组存储
  for (let i=0;i<n;i++) {
    p1[i]=p[2*i];
    p2[i]=p[2*i+1];
  }
  
  return {p1:p1, p2:p2};
}

@autobind
export class Bezier {
  constructor(knots) {
    this.knots = knots
  }

  get x(){
    const {knots} = this
    return _.map(knots, 'x')
  }

  get y(){
    const {knots} = this
    return _.map(knots, 'y')
  }

  get nKnot(){
    return this.knots.length
  }

  get nPath(){
    return this.nKnot - 1
  }

  get weights(){
    const {knots} = this 
    const res = distances(knots)
    return res
  }

  controlPoints = key =>{ // 计算控制点的算法
    const {knots} = this 
    const coords = _.map(knots, key)
    return computeControlPointsBigWThomas(coords, this.weights)
  }

  get points(){ // 导出方法
    /*
     * 返回一系列边的点数组，格式为[[p1, c1, c2, p2], ...]
     */
    const {controlPoints, nPath, x, y} = this

    const cx = controlPoints('x')
    const cy = controlPoints('y')
    return _.map(_.range(nPath), i => {
      return [
        {x:x[i],y:y[i]},
        {x:cx.p1[i], y:cy.p1[i]},
        {x:cx.p2[i], y:cy.p2[i]},
        {x:x[i+1], y:y[i+1]}
      ]
    })
  }

  get ds(){ // 导出path的d属性
    /*
     * 在points的基础上，直接生成path的d属性
     */
  }

}

