"use strict";(()=>{document.addEventListener("DOMContentLoaded",()=>{let e=document.querySelectorAll("[mt-el=apply-button]"),n=document.querySelectorAll("[mt-el=back-to-job-info]"),t=document.querySelectorAll("[mt-el=job-info-wrap]"),o=document.querySelectorAll("[mt-el=multi-step-wrap]");$(e).on("click",function(){let c=document.getElementById("Name").focus();$(t).css("display","none"),$(o).css("display","block")}),$(n).on("click",function(){$(t).css("display","block"),$(o).css("display","none")})});})();
