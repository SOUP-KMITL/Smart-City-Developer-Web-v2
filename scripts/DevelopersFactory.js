angular
	.module('DevelopersApp')
	.factory('DevelopersFactory',function($http,AuthenticationService) {
	
		function getService() {
			return $http.get('https://api.smartcity.kmitl.io/api/v1/services');
		};

		function getCollection() {
			return $http.get('https://api.smartcity.kmitl.io/api/v1/collections');
		};
				
		function getMyService(username) {
			return $http.get('https://api.smartcity.kmitl.io/api/v1/services?owner='+username);
		};		
		function getMyPageService(username,page,pagesize) {
			return $http.get('https://api.smartcity.kmitl.io/api/v1/services?owner='+username+'&page='+page+'&size='+pagesize);
		};
		function getPageService(page,pagesize) {
			return $http.get('https://api.smartcity.kmitl.io/api/v1/services?page='+page+'&size='+pagesize);
		};

		function getMyCollection(username) {
			return $http.get('https://api.smartcity.kmitl.io/api/v1/collections?owner='+username);
		};
		function getPageCollection(page,pagesize) {
			return $http.get('https://api.smartcity.kmitl.io/api/v1/collections?page='+page+'&size='+pagesize);
		};
		function getMyPageCollection(username,page,pagesize) {
			return $http.get('https://api.smartcity.kmitl.io/api/v1/collections?owner='+username+'&page='+page+'&size='+pagesize);
		};
		function getServiceByID(serviceID) {
			console.log(serviceID);
			return $http.get('https://api.smartcity.kmitl.io/api/v1/services/'+serviceID);
		};

		function getCollectionByID(collectionID) {
			return $http.get('https://api.smartcity.kmitl.io/api/v1/collections/'+collectionID+'/meta');
		};
		function matchkey(collectionID){
			if(collectionID == 'sc-80c9fedd-c1bf-4ba8-954a-2bececdbebef'){
				return 'eyJkYXRhIjoiWW9NcDh5Q2hobkljd1ZrbDFhRW5qNDNrYk9MS1NSSkNjZVZtNFNSc3dtQWFxSnJydDRpVDY2THRqa0ljZ2FUWmpTTktvZTVlRHppeWJQbGFDd1NKUm9PbWFIR0dWdHpnLWtqRzFtZGZOcERKNDNpb0ppeTkydXNXNHA2VmxqMWVFTWZvOV9IRE91VXdEOXZYaHhBVUpYQXpGYnJKaEhQSlhhMXdnM0Q3el9aX010NjM5Vk5jdXViTnByUDQ1QTVhS2ZkX0hpQ0hCZUJqUmROdU9kU2k5bHFLZndUcWNONVFDMjQxTTJzekdKckpxVEI5VWZaODdfank5cUZXVkNaanctb3Y2YjdHcllCYnVDU1RFWXUxcUdpeDB1bUUxOUNCS202dXJhY196ejdBSGh3S3Z6a1VpNzNWZkVlSWxOOEkiLCJrZXkiOiJnTDBnSDkxeUNiYUtfRlJ2MkJPWkh3RUREemFiZlhsc0k1VHhvT0RSaHBVVGRzX181aUxvSFFIby0xN19pc3VEbktNUDZxSEI0U0xZc19BWmlLTm9VRzhvT1lCaW1JZG9rMF94alhfRldJNDlUY09oUTVPOWNhSlZVblE4bTZabE9LeDltc3BzY1ZwVmY5NlVfWUJDczBnWlIteDd2T0JIWV9HWUNONnBFUnZ0WENMazhPSHhsNjVza25GVFhUbmJYaEhQRVcwTVJvQzJmZWk5b09KbEVUdlZoVWxQZHQzeTZtS3VrV1FoS0syMHJrSzU4ZDNZSnVpZWRaS3kxMWV4THJkQW14clo3YVhMXzMteFBQOGpxWndJMjBjU1MzTFRsekViS20tcjFJb0dYaUl4SHNhZUlUMEt0RUhGdUd2YVo3NGtjOFdzMlZSRVBsd1JNQ0o0Zmc9PSJ9';
			}
			else if(collectionID == 'sc-35c22783-e35e-453c-b16c-b01886308640'){
				return 'eyJkYXRhIjoiSVVnVHRveWlhOE90WDNVSlNTaGd1Z2FQaXo2ZmM3X0REQjM0bEc1WkRnV0t2MlNPY0pNQ2pHZ0tTYzZDSXlxTE9xXzRBcmRoM0drSUFoQnF2TF9lRTZYNVJxSV9DelZaVWppWklIZ3NpcVVqWUZmOGQ5ZjFoQ19yX216WlFyRUNXSHBqeXR4ZnR2a0VldDZxQ09IYnlIUVV6QXpteHJwMi1aQi11X0hiMmxhVDg2VlhDSmZ1dVc0OHJ1cEczNEpfbEd0Y0MxMmhXYlVNSVlQaXpFUEpqZk40bm9ENzN3R3pueWhjNVZBNVllMlZLRGtfYWNjVXgtLXcwTnI1UzcyLUhfNzhyNHNMVmtqT3NUcWdYZG16cDJaNVQta3Z1MWxHR2pKYUZEYTN0dE1ZV1dKMDRIYTlJWmcya1BHNWVLRm4iLCJrZXkiOiJQd0Nyb0RlYnBYRlNXay1kdzBiTFJCQzV4SWE0RUFjN29SWDQwNHZTSmxIQXhLb1J2WmhuQlNxbFdicURwa212SjV5TkRia08yRm44VmprdXhUYzdwNVBfVkNFTW1leUhkUHFWeXUycm5XLTFkaDNQYU42cVJZUHRLM3ROSnZLMjFubFcxUVlpM2J4TzlXYXZpT0tXeUp4MHFWZVVzWUtwM3JrejY1dXkwS3Bpa3J6MTc4Nl9VcmRkVTNBN3RGR21uRXllUy1mNEgzLTJZUjhVZ3RNWnBqSnlJR3lmZFBRMzA4cTByY2IyeFNuVTllaDdpcjBsS1BlR2xHWVBucVhYdTd6bmc1TkJOQlV0ZllJZGh4cHNBSjBwRlpYcG82YlR2ZlRNTlh4cnFlNW9JSm9vaWZIT2JydkptcUxKQ0Z3OEVRUHNWTXZ3ck9hM2VNMXNaQUxQalE9PSJ9';
			}
			else if(collectionID == 'sc-7e52dd11-150e-4243-bfa9-e4da91ea0776'){
				return 'eyJkYXRhIjoiWVRDeWtFZi1kRDRqVlM5MnRXTTZRTlNQZTNIQXB2aDZVMkY3TzJrRUc2cDVhZHJXWjNGVHNobDNBRUVwRGUwNkVZNzFKYk1RZVM0SUwyREhXUWktVUlUWHBsSUdNQkJVcGVOSU9WVWsxSmtqS2ZNRndDVm1jUTlSYTFhMXFwMndNS1diY21tcjY5aEdDUnNMV1Rodkdkd2lINDF0N3dmZDJhdnBkZWFZeklSWU5BbnhxYWhaSlRvWTRfQzBhMUxVWWVrdndHRmhCUUFlTVZUck90R2h0aVNkOUhCNGFxc0lfM0ZRV1g0TGtTUXk3b1FKZ0otRUhVWVNBUjlma2lKS0VPSVVrZXh6YmM3NC1LU296VEh6T0duTWY2bjl5VzdMRGpxZDFZS3dfT3FTblUyQU16SWVReExTRnczZUxadnMiLCJrZXkiOiJBd1lFWkNUejRLaXdHeWNrd2JyT0x2Ymw3N3BWSkFfRjhTMVBVeUVaQV9nUG5lb25oOXVGZ2k3Mi1VWDdsS0UydGFuc0xRaC1Td3REM01uSkdpTFFtOFFRRVhSVmFuSjNLSUExLWtUZGlRR1NyTE1jTWZvRld1S1Axd0pDQ0YyZFhrTEh1UzVKMl9FUDd4ZzFXaEpOTjdmYlFFNURHV1F5eGRmMGdlc2tLOTJ2Z3pjeTg0TVUwczNiWDBnWWMyTk1lMmhWN282UWRxbFpKcFZjSGtUa3FxbFFQbEcxS3NzRVY5MnZFOVVMTTVMamJmWkpwQU4zMUpocVRReWxrTlFJSHVpbnNkdUFxNmo0eWFuRExraGdveTJKRTRJem52a3NpX2FUWVZkOGVUN0JnSW9JdFJNZnR2R0FRNXhaSWc5Z3dhSzNQZ1JjUkFiSXJRam9KT1NiV3c9PSJ9';
			}
			else if (collectionID == 'sc-afdb65da-a8ac-4b37-b4ff-ab025578086b') {
				return 'eyJkYXRhIjoiNWcySGxkeWNtT3RkZmlURGduZV85V1V6U1NqXzFJOHQyUU5rQkJPMEJKQXduTkZkcmhPcG83amlKRVdJRzZJVExkVE95S0huR1lEczB2UmRVNF9CbkFUdEwyWUE3M3d5NHVTeXhGU2JVQVlueDZIc1Y4RnRYYW1iU19UZ2RELWNTZFljOGNWQTRyV2plUERycWpHZkdaWHVHYlBlUjNkblNoSXZTdVJIeXFJc1YtNGZVMVdjUHRFdENZRnNRMUZKa0hNNlJzWl9MdkllTEtlQUZIZTZDUm9ic0FEYXZueHRFeGY5bE5TME5CSENBX01XMFRXM253dWswY2xuVTNCMThJYUlLaktYdEc0cFNFNDZ1VHIzWFNOWXlfOFJFQjkxUFZMYzNXOE5OYU5JMXV0OVUyNkU4Vjg3YTh1R1VXQ2oiLCJrZXkiOiJIZTdUS0FzcU1mTVBNd01pMnYteE8tVS10c3FFRHZYN1Z4QXFOdDBWSExLNGROaGpsSXZVYkczUkhrLVo2Uy1jNk9Sc3ZQS2x6MDlxYkwtazY3eS1UVFhHdkUxMXlzbG1FU3h0aElvRWhYM1BTVTg1LUt3WTFEelJud2ZxMElJOThvVmlDYzFGNmxTQmFDZldXT1VWQkJRRGdzUEdPQzJzTk1zSzlrNGRIMXptZkt5WGNBS09HMXAybFR5bkEwWFhuVWtrNHpjd1U0WkxybWM5enQ1R3JpWGlGdXhCNFUwWEloYUNXZFdsUmMxTGctekdaWjlWUkZ5T095aUk4dTNzeDJIQ2NDRmdsQml5VGJzRnVGMHZZbkY1UmJoaDhXMVFDVDRIZ0xfa2NSQ3BBU1h6VHd1WkdrLU8zVDZVR1BzMWVnaVpVWHRpdTJSYWJrREk2UVdQUWc9PSJ9';
			}
			else if(collectionID == 'sc-8a872821-39bf-470a-9eec-6824467cccb3'){
				return 'eyJkYXRhIjoiUnBHd3NFeF9Wa1Q1T0JWcmJYZDhibWJRbzFlWVhNVEpfVW5XVFZ5QS1BYUJFZTZQbmRLcGNzTWhPUG0zN2hZSFpSQ1Byd19nblNmb0E2aDduVWRzanhsX2tSenp2TW9ud1lpa2RFUTZ3bEd4U29RSE12bzhscUtFaU8wMHZ5MGtNQk1DaS1RMURkMlFGRm04X0U0a2FrVGZCTGNDdnVTZTBOaFdBT2oxOGJKZFcwZThZNGpua1p2MmpvYUNGajdCemNzY1libV81UHRIVDlTREVuSGVHWF9oS09jWHRGSXhvU24xOEhpdFY3OUJmbldJVTBJWmZCcnhYSVk2UXJUZGRndTUyY1dsOHhCMTZaSmZpOWs4VWZRQ0M5RlBlT01XOTVFX3Q5SGdSRGVDRGlRZktOSnYzRl9uZ0czdWNwQlIiLCJrZXkiOiJUNTZad0Rld0V2VTNVQUs5Y2VpU3B3VklOTmFueDc4QXNkeVJoQjUyUmdtNlJCSWJTa01iY1VyVFZGTXgyMFIyeVo5R1ZTUzR2ZzIwYnFhQjA1SlV4V2ZqYUhBX293emlteGgtY1BtN0NCMC11TmFmNGlmMHU2Wm1CcVphVGczMEhtUTUxQWE3a0lqUjZkYUpLY192UWFFZTk2TTZLMlZJU0Foa2ZZc29QWmgwMm5lZFhrNGhLMzd3Z3NCdC1DUlVab0NyQ0U0Vm91dzVtMFVLNWFYUUlzLXVfZ0R1dDQtZDBvSy1KaENUQW5USTdHMDdvVFB5cFVTRG5FY0dXdDFuYVFHZTFqNW1uTTMwTVkyQ0lOYW82WjJTSkJRc3FZQk5VNjRGTkZDTDRqX3E3NnV3eFptLUdjMkctMVpPcVZHNWxDcVMyaDBHQUdLdVNuT3d0TlctbVE9PSJ9';
			}
			else if (collectionID == 'sc-d3bc30c7-a773-409c-875a-3cbd79afdcc1') {
				return 'eyJkYXRhIjoicnNMYjUxaVFLNHRsU0RWQUJJZFhPS3ZFaFllUHg2X1RPRllpWFZ5bDJnS3ZrNmRFSzZadkFwZUtJQ3J6aXJwemRRMUtvN0VHWmVZbkFMTXNHV3E2SVpNU2lDWXdfOC1iMmtaR2M5bXZmVElkYy1yNXFzcnZUY2J0LWZEZkc3SURVdmdSVFJUMGFILVQ0cWl3REh1RFRjMnFZcllpc1JYdlFTVHR1Q1c4T19DVXoyYjlqU09uajB3Wmp2RnE3RHVEVkM0QTQzY1Y0LWd6VURQLTF2Z1AxU005aGxJX1ZrWDF6WTNKX1M5cFNRS2FDTXAtTWJzTTdyNXpDenBnUVlLcjRyd1dwWkJmR2VSYWFsaUZRTzBQNGltRmVLd0pqTjdzQnlTNFczMGlPb1lXcnZERkJxZThHd3JGdkJERDc1NzUiLCJrZXkiOiJBSFk4dFU3VmwwMzJrUldhNHlSWDJhSDNQT3hGdmJkdkp2SGVJeVRJSkFjTktWYUUtdm94LVd6aDdBRE5GaV9FbFZrZHVEVHhJOERTR3pKN19NS21JVHJxZDRYLXhOTlVqQU9fcVE1RHB1dXc0dXNtMWZzd09WaHA4aUlNMEZEQllpUVRGTEh4c2ZPTjlzSTV5Z21udXNlS3RuMERHSEh1bFdoRTUyNWFqVS1VSDFUN3hPYWJ6SzlqZ1JHeHpleDVINkRKUWpMZHczVHdpdk14QXpmMHhtVjk5NG1MUHdsNFRFWnNfV2E1TllYZjMwckNENW8yMURfaV81SEJlRnhBbC1NVVFMZ0piVWg1Q2JUQ0tRN2FLZTNXUHpQZ1haX2ZDdUhoUm5CU2xRb1kwY3Z3Ui1PSjRGY0xfZ3A0SzB3S0tJdmtNbXhiNHhiR3RJelVOWXpJTWc9PSJ9';
			}
			else if(collectionID == 'sc-de23b154-222e-42b1-b612-acc3c9fe6e30'){
				return 'eyJkYXRhIjoiclBqNG1ROWplVkk3azRjbnhjUEtxTXBiMVJ5T0dZcEFyTmI1ZzJxZVdOeGFNSUp4eTJCcFRLMVppcFU1cGNiU0pnakJZeGg1X0F2a3prS1hlSjN6STMxMEJDOFd0WVR5WlVZd0szZlpQaUQ4eF81TkdiaXlxQmRZNDgyRG5rOGlfOVAxNnBmOGliaUU2MHdaN1JWWXp6X2d5NXdQdlZCazF6Q3NWZFFpSEl6MG9GaTJ5NVlhY1NuN1RvZDVGTmpSZzdqY0QzaXREU3BqalF5azk1NkE2ZHhMblNmaDNMLXBhMGlxbEVYNUhGT1c1b0FHVDNUVTdkS0kyclgzY2F2WThNS1RNOFIxN04wUzVTdThZa25pYkd5SXJHTDVWaVlGVDJNSXIyLU5Rc0FtTUg2MHJiYVlmeEs2dnZ6OXdFQ04iLCJrZXkiOiJEOGxteUFQcW16alZNcEctQVFXc2VFY2xfZFRySXpsWE1nUlc4V2t6SnNyZEljTDh2ZXVaUm9JTHEzdmpNWU8wMUtTSVhJYXhMWDZLTkFFRzlVd2lBVEZyM3FzemJwVnNQYVc0eXhpQ2JUdGZ2N0M5WXBldXkxNExXS0Y5UW5HaXRMeTJTYmdWM1dFNV9MRlJDV3ZCMnFfSTFMMlM3OUN0cWlYOGpnSm1qLXc5TE1qNVFrRXNUQnA4d0tWVGF4M3pwa1psdmI2eVBSQlZWazdxdXBKYllQQ3JmZTlkeGJaWGJwZ0EyOVF1dnJ0TFZuVUsyeDMxRmZJZUlVWEpvRkJaMnNYS0o0T1BZV3FjbDV4bWk5ZGVwSjBpaGppRGpWcHdXcDRIeWNSSFh1SU5hNGU3VHA4VTVtYmhvVFVndXc4U3lncHdXZzBHalNENHAwZTJ2T280WHc9PSJ9';
			}
			else if(collectionID == 'sc-c5a897d6-3d29-49cf-b0ef-e82b495ce864'){
				return 'eyJkYXRhIjoiNHJxQ2VHQjhObm1PMTdrRW1aMXp1d0JHRGVVYWNpUVZiVGg0eFZ0Vjc1elRvZG9ubGh6V1I1NTVoYVJ4TlUya19rWFVvZWt5UzVmQVROLTBNbml6YXJqYzd1V2ZRbE5iLTFoOFdJM1Y4TXNpX3VidUR0akRITU13b2hoMnZOQm9DRktpNWQ0eXYwQktpOFYzNnM0ZlZVdm1VOUFjeFRaZjREb0RFaGlaNmhLS1BhRTRZeGxUcjJvY294RnBpREpaSEtIRHRTQVIxNHdNMHVjcHY2YlZHZ0NjejItVk9BZmQ1eWRrb1pQSXJwMjJpaXNBemxSX1FiMDRWUmVYeGRjRVlGemhMb2xJTmZvRlJjbjU5SkhMVXBmR1BnUDhuT0hHTHNuU002S1dZRkhEY3lMQVhJREduTXdTc003R2pSdTciLCJrZXkiOiJjZzk5dkZmeEVjdUZOS3hDempyZUYzd2VMLXpaZ2NiMzRZWWFaXzhja1A5c0hWakJrV2ZKS2ZvQjlPaHM1RFZ5ZmJxNGRBU3dJLWlCdHktc2dhTGtMQnVwQkx1dU5VeFdfLXNVQkYwVVlCS0hwMmY2VWJtWVVmbGZPeWpSS3hmc3B1Y1pZUTY2Y1hKYXlYUGpESG1kVlYzZ3c2dGpyeEJtMVNFRGtlbFBHSTJyOWlqLXlSRnRZcXFJcXBQM1hPWm93S1hvWEQ4aXBYN1lGaWFDQnY5aGZkNlJQNW0ybGQzYTI3N1ZRLVFwMktpcWVRUTNsQUpDbUszWWJRcC03dFVoM3N3dXBkejJiS1IwYmM2Q3EwTXZpejdWaXM1V01LNjJXWG11WW01Z3dmRmMySEJrZnFNd2tzX0FUTmExYnFON1N6UzBwU1dxemduZGxRUG11c2RtR0E9PSJ9';
			}
			else if(collectionID == 'sc-ea61d0b6-c66e-40d8-9371-81271f6907cb'){
				return 'eyJkYXRhIjoiM2hCQ1d5UjBPamR5UHRXdUdjY3dyTmJWQ1hwelRIZENoSXRRcElFUWJseUppcEY5bU9lYXhUTHk3UWl5dWpaS0k5UUtuVF9MVXZDLWgxdjdVNDV5em91ejFqSUh4VUpKaEI0S0U0V0RsdFVjakExOWxBaXJRcGo3cEMyZC1jNlZPWU91dUlNNnNrc3lNS2cyWk8wajNQUDZHQWhlVEJ1Y3ZrYXJrWGpzbHVPdkZIa3dweElscUxZSEJMYS01Qmx2WDlyWHZ5b0lVQXdPRTJtdTR5SHZwa3NRSU9tVXVDYVJ0WFd2M3NnVmJBMjdFZW1MSDRWS0FOdUZPNU9HcDVueUhlVFB0R0M3LXpsNTM5TWM1WVR0dzhJa1p0dDFBUm9udzhaS09hQk1SSm4wS1JvSkR4YVRYNmFIT213Y1RTUFAiLCJrZXkiOiJSaEk0bG1LQUVMZUxldFVRek80VjhRRy1JcFFDT1BRamhhWlA2VGRfVlA0VGV6b0tFR0Z1a0FlbTc0dUxCT3lucTFtVW9OWVVhTnV5TlZ4RWtTa0xzdDI5S3dhM2JJTUs5OXFKaUFFY2p0SXJkYUVHMlBFTUYtNnM4eFVHS2hpZklnbDhVQ2dGZWxKMzE3Uy0zYzNHUE4wQjdsX0dJbVNGLWN4eFlnbENtSGF6bU1jeEg2cEZLZ0J2UUFmZUppUzVQZGRqM2ZKc2FwcG5QZ2Y3SGN0VXFYa1A4bm5nY3owSXlIb3l3emNKMk1jUkVfM2ZkTnNCRVhmeUpHd2x0WjVSYnR5WTZNd0pKbGtRdlBWcUlYWnpvNlBRU0kxUWwwV2FwQUhrbTdRMjZqb2VXa3N4XzM2LWM0ZDB2VEJ4TWFHZUU2SEJJTGp5Slpialg0eU9rUGFmaEE9PSJ9';
			}
			else if(collectionID == 'sc-bd99486e-57c9-44ab-ae5f-80dccab22032'){
				return 'eyJkYXRhIjoiR2tybXZkbHhfaTM2N185endzY2hrdkRQQUpDS3d2d2p3ejA2WjB4VE1qakpZN3RUdHpMSWQtbmNkOElLdVdzcUdwSS1pTGM3VEw3cXlBdl9YYkRWM1NFLTZ0V0tnYmdfYnh5MDVDLVotYUtiYUtIdG5uai15X3ZpNkM3amJaSk1CM0xwLVp0ZjVJSzlsYjFEa2V0V2QxMmRlYnozek9YcUN1OHZlLXFWR0tDRWtZNkFFWExISVdtNnJsb1Z2SlhxSFVCMGZwVnNGUDIyVWZKQUhFWUg3SlBUbHV4RzVYN21DUTBIMG9kbGZMQ3E3djVnUk1wVjJELTJxMTREU2RnaVNpbzIzdUppNENodjFmclplX25JcGtjOFdjSjNOU1JRbjhpOUQ4T09vT3ZmWFRfZ3VWaVlwUU45NkcyTFVYV0MiLCJrZXkiOiJmS2hXOUFRb01aRkdXemZhOTJSQmJyUkRUQUdvRFhzcEFuTmpHcXFrWXpmY3hfbUVEMWFkc3JjNFV5RUdTb1RVV0VmQV82ZnROMU5fdjhmdXktUklsM2RBVURkckNyQ2NSS0F3d09La1VVaDFVZFRmV3lSSzhUV3o0QzVhVTl2UFB4Si1wM21zMUFENl9vaGwyd1FnZ05wVFVma2VoOVZXeDdzYU5aV0QxX0lKNjViMlhVUldkU3RwdVdWc3MyWDlGRFowem5pNWY4d0NOd0VjRjdTVDF3VjRYZGc4MERodEs4WnlnbkgxR2RIT25WX09PNGh1X1R0cVhhLTJoTU80YmR0S08zUWxMVlNPRXVZLW5BZENpUlNrcUpfS05KX2cxQ3JvYTFqZzVKc3BuTHVHenNMQ0tDT2ZlVncwYXFNdjUxQ3ZzTDhzNjc4OEJ1N0JLU0V1eVE9PSJ9';
			}
			else{
				return 'Basic ';
			}
		}
		function getCollectionGraph(collectionID){
			var key = matchkey(collectionID);
			var req = {
               	method: 'GET',
               	url: 'https://api.smartcity.kmitl.io/api/v1/collections/'+collectionID+'?last=10',
               	headers: {
                 	'Authorization':  key
               	}
           	}
        	return $http(req);
		}
		var data = {};
		function savedata(mydata){
			data = mydata;
		}
		function getdata(){
			return data;
		}
		var owner = 'user';
		function saveowner(myowner){
			owner = myowner;
		}
		function getowner(){
			return owner;
		}
		function createCityService(name,des,callback){
			var data = {serviceName: name,description: des};
			var req = {
               	method: 'POST',
               	data: data,
               	url: 'https://api.smartcity.kmitl.io/api/v1/services',
               headers: {
                 'Authorization':  AuthenticationService.getuser().data.accessToken
               }
           	}
        	return $http(req);
		} 
		function updateThunbnail(id,img){
			var form = new FormData();
			form.append("file", img);

			var req = {
               	method: 'PUT',
               	data: form,
               	url: 'https://api.smartcity.kmitl.io/api/v1/services/'+id+'/thumbnail',
               headers: {
                 'Authorization':  AuthenticationService.getuser().data.accessToken
               }
           	}
        	return $http(req);	
		}
		return {
			updateThunbnail: updateThunbnail,
			createCityService: createCityService,
			getCollectionGraph: getCollectionGraph,
			getMyPageService: getMyPageService,
			getMyPageCollection: getMyPageCollection,
			getPageService: getPageService,
			getPageCollection: getPageCollection,
			getMyService: getMyService,
			getMyCollection: getMyCollection,
			getService: getService,
			getCollection: getCollection,
			getServiceByID: getServiceByID,
			getCollectionByID: getCollectionByID,
			savedata: savedata,
			getdata:getdata,
			saveowner: saveowner,
			getowner:getowner
		}
	});